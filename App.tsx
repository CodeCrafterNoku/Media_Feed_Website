import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  Animated,
  Dimensions,
  TextInput,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { fetchPosts } from "./src/api/mockApi";
import { Post } from "./src/data/posts";
import { PostCard } from "./src/components/PostCard";
import { requestNotifPermissions, scheduleReminder, addResponseListener } from "./src/notifications";
import { isDueWithin24h } from "./src/utils/time";
import { formatZar } from "./src/utils/money";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function App() {
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | "Due 24h" | "Due this week">("All");

  // Missing state variables
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(3);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const notificationDropdownAnim = useRef(new Animated.Value(0)).current;

  // Mock notifications data
  const [notifications] = useState([
    { id: '1', title: 'New post available', message: 'Check out the latest content', time: '2 min ago', unread: true },
    { id: '2', title: 'Reminder set', message: 'Your reminder has been scheduled', time: '1 hour ago', unread: true },
  ]);

  useEffect(() => {
    requestNotifPermissions().catch(() => {});
    const sub = addResponseListener((postId) => setOpenedId(postId));
    return () => sub.remove();
  }, []);

  useEffect(() => {
    load(1, "replace");
  }, []);

  useEffect(() => {
    if (openedId) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [openedId]);

  useEffect(() => {
    // Only animate search bar width on web
    if (Platform.OS === 'web') {
      Animated.timing(searchAnimation, {
        toValue: isSearchFocused ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSearchFocused]);

  useEffect(() => {
    Animated.timing(notificationDropdownAnim, {
      toValue: showNotificationDropdown ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showNotificationDropdown]);

  const load = useCallback(
    async (p: number, mode: "append" | "replace") => {
      if (loading) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPosts(p);
        setNextPage(res.nextPage);
        setItems((prev) => {
          const merged = mode === "replace" ? res.items : [...prev, ...res.items];
          const map = new Map(merged.map((x) => [x.id, x]));
          return Array.from(map.values());
        });
        setPage(p);
      } catch (e: any) {
        setError(e.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load(1, "replace").finally(() => setRefreshing(false));
  }, [load]);

  const onEndReached = useCallback(() => {
    if (nextPage && !loading) load(nextPage, "append");
  }, [nextPage, loading, load]);

  const selected = useMemo(() => items.find((i) => i.id === openedId) || null, [items, openedId]);

  const filteredItems = useMemo(() => {
    if (filter === "All") return items;
    if (filter === "Due 24h") return items.filter((i) => isDueWithin24h(i.dueAt));
    if (filter === "Due this week") {
      const now = new Date();
      const endOfWeek = new Date();
      endOfWeek.setDate(now.getDate() + 7);
      return items.filter((i) => {
        if (!i.dueAt) return false;
        const due = new Date(i.dueAt);
        return due >= now && due <= endOfWeek;
      });
    }
    return items;
  }, [filter, items]);

  const filteredAndSearchedItems = useMemo(() => {
    let filtered = filteredItems;
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [filteredItems, searchQuery]);

  const searchBarWidth = Platform.OS === 'web' 
    ? searchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 240],
      })
    : 200; // Fixed width for mobile

  const dropdownHeight = notificationDropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const dropdownOpacity = notificationDropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const footer = () => (
    <View style={{ paddingVertical: 16, alignItems: "center" }}>
      {loading && <ActivityIndicator />}
      {!nextPage && !loading && items.length > 0 && <Text style={{ color: "#666" }}>No more items</Text>}
    </View>
  );

  const handleNotificationPress = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const clearNotification = (notificationId: string) => {
    // In a real app, you would update the notifications state
    console.log('Clear notification:', notificationId);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.container}>
        {/* Modern Gradient Header */}
        <View style={styles.headerWrapper}>
          <LinearGradient
            colors={['#43b0a1', '#2e8b7d', '#1a6b5f']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <BlurView intensity={20} style={styles.headerBlur}>
              <View style={styles.headerContent}>
                {Platform.OS === 'web' ? (
                  /* Web Layout - Original side-by-side layout */
                  <>
                    <View style={styles.titleSection}>
                      <View style={styles.titleContainer}>
                        <View style={styles.logoContainer}>
                          <LinearGradient
                            colors={['#FFFFFF', 'rgba(255,255,255,0.8)']} 
                            style={styles.logoGradient}
                          >
                            <Ionicons name="grid" size={16} color="#43b0a1" />
                          </LinearGradient>
                        </View>
                        <View style={styles.titleTextContainer}>
                          <Text style={styles.appTitle}>Media Feed</Text>
                          <Text style={styles.appSubtitle}>Discover • Connect</Text>
                        </View>
                      </View>
                    </View>
                    
                    {/* Search Bar */}
                    <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
                      <Ionicons name="search" size={18} color="#1C1C1E" style={styles.searchIcon} />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="rgba(28, 28, 30, 0.7)"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                      />
                      {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery("")} style={styles.clearButton}>
                          <Ionicons name="close-circle" size={18} color="#1C1C1E" />
                        </Pressable>
                      )}
                    </Animated.View>

                    {/* Notification Bell */}
                    <View style={styles.notificationContainer}>
                      <Pressable style={styles.notificationButton} onPress={handleNotificationPress}>
                        <Ionicons name="notifications" size={22} color="#FFFFFF" />
                        {notificationCount > 0 && (
                          <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>
                              {notificationCount > 99 ? '99+' : notificationCount}
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    </View>
                  </>
                ) : (
                  /* Mobile Layout - Title above search bar */
                  <>
                    {/* Mobile-Optimized App Title */}
                    <View style={styles.titleSection}>
                      <View style={styles.titleContainer}>
                        <View style={styles.logoContainer}>
                          <LinearGradient
                            colors={['#FFFFFF', 'rgba(255,255,255,0.8)']} 
                            style={styles.logoGradient}
                          >
                            <Ionicons name="grid" size={16} color="#43b0a1" />
                          </LinearGradient>
                        </View>
                        <View style={styles.titleTextContainer}>
                          <Text style={styles.appTitle}>Media Feed</Text>
                          <Text style={styles.appSubtitle}>Discover • Connect</Text>
                        </View>
                      </View>
                    </View>
                    
                    {/* Row for search and notifications on mobile */}
                    <View style={styles.mobileControlsRow}>
                      {/* Compact Search Bar */}
                      <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
                        <Ionicons name="search" size={18} color="#FFFFFF" style={styles.searchIcon} />
                        <TextInput
                          style={[styles.searchInput, { color: '#FFFFFF' }]}
                          placeholder="Search..."
                          placeholderTextColor="rgba(255, 255, 255, 0.7)"
                          value={searchQuery}
                          onChangeText={setSearchQuery}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                        />
                        {searchQuery.length > 0 && (
                          <Pressable onPress={() => setSearchQuery("")} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                          </Pressable>
                        )}
                      </Animated.View>

                      {/* Notification Bell */}
                      <View style={styles.notificationContainer}>
                        <Pressable 
                          style={[styles.notificationButton, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]} 
                          onPress={handleNotificationPress}
                        >
                          <Ionicons name="notifications" size={22} color="#FFFFFF" />
                          {notificationCount > 0 && (
                            <View style={styles.notificationBadge}>
                              <Text style={styles.notificationText}>
                                {notificationCount > 99 ? '99+' : notificationCount}
                              </Text>
                            </View>
                          )}
                        </Pressable>
                      </View>
                    </View>
                  </>
                )}
              </View>

              {/* Filter Pills */}
              <View style={styles.filterContainer}>
                {["All", "Due 24h", "Due this week"].map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => setFilter(f as "All" | "Due 24h" | "Due this week")}
                    style={[
                      styles.filterPill,
                      filter === f && styles.filterPillActive
                    ]}
                  >
                    <Text style={[
                      styles.filterText,
                      filter === f && styles.filterTextActive
                    ]}>
                      {f}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </BlurView>
          </LinearGradient>

          {/* Notification Dropdown - Outside header for proper z-index */}
          <Animated.View 
            style={[
              styles.notificationDropdown,
              {
                height: dropdownHeight,
                opacity: dropdownOpacity,
              }
            ]}
            pointerEvents={showNotificationDropdown ? 'auto' : 'none'}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F8F9FA']}
              style={styles.dropdownGradient}
            >
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Notifications</Text>
                <Pressable onPress={() => setShowNotificationDropdown(false)}>
                  <Ionicons name="close" size={20} color="#8E8E93" />
                </Pressable>
              </View>
              <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable style={styles.notificationItem}>
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <Text style={[styles.notificationTitle, item.unread && styles.unreadText]}>
                          {item.title}
                        </Text>
                        <Text style={styles.notificationTime}>{item.time}</Text>
                      </View>
                      <Text style={styles.notificationMessage}>{item.message}</Text>
                    </View>
                    {item.unread && <View style={styles.unreadDot} />}
                  </Pressable>
                )}
              />
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          {/* Empty State */}
          {filteredAndSearchedItems.length === 0 && !loading && !error && (
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={64} color="#C7C7CC" />
              <Text style={styles.emptyTitle}>
                {searchQuery ? 'No matching results' : 'No items available'}
              </Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery ? 'Try adjusting your search terms' : 'Pull down to refresh'}
              </Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={styles.errorState}>
              <Ionicons name="alert-circle-outline" size={64} color="#FF3B30" />
              <Text style={styles.errorTitle}>Something went wrong</Text>
              <Text style={styles.errorSubtitle}>{error}</Text>
              <Pressable
                onPress={() => load(1, "replace")}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Try Again</Text>
              </Pressable>
            </View>
          )}

          {/* Loading State */}
          {filteredAndSearchedItems.length === 0 && loading ? (
            <View style={styles.loadingState}>
              <ActivityIndicator size="large" color="#43b0a1" />
              <Text style={styles.loadingText}>Loading amazing content...</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={filteredAndSearchedItems}
              keyExtractor={(it) => it.id}
              renderItem={({ item }) => (
                <PostCard
                  post={item}
                  onOpen={(p) => setOpenedId(p.id)}
                  onRemind={async (p) => {
                    const when = p.dueAt ? new Date(p.dueAt) : new Date(Date.now() + 5000);
                    await scheduleReminder(p.id, p.title, when);
                  }}
                />
              )}
              ListFooterComponent={footer}
              onEndReachedThreshold={0.6}
              onEndReached={onEndReached}
              refreshControl={
                <RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={onRefresh}
                  tintColor="#43b0a1"
                  colors={['#43b0a1', '#2e8b7d']}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {/* Enhanced Bottom Sheet */}
        {selected && (
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F8F9FA']}
              style={styles.bottomSheetGradient}
            >
              <View style={styles.bottomSheetHandle} />
              <View style={styles.bottomSheetContent}>
                <Text style={styles.bottomSheetTitle}>{selected.title}</Text>
                <Text style={styles.bottomSheetSupplier}>{selected.supplier}</Text>
                <Text style={styles.bottomSheetAmount}>{formatZar(selected.amountZar)}</Text>
                
                <Pressable
                  onPress={() => setOpenedId(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Overlay for notification dropdown */}
        {showNotificationDropdown && (
          <Pressable 
            style={styles.overlay} 
            onPress={() => setShowNotificationDropdown(false)} 
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0),
  },
  headerBlur: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: Platform.OS === 'web' ? 'space-between' : 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    width: Platform.OS === 'web' ? undefined : '100%',
    flex: Platform.OS === 'web' ? 1 : 0,
    marginRight: 8,
    marginBottom: Platform.OS === 'web' ? 0 : 12,
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  titleContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: Platform.OS === 'web' ? 8 : 0,
    marginBottom: Platform.OS === 'web' ? 0 : 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  titleTextContainer: {
    flex: Platform.OS === 'web' ? 1 : 0,
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  appTitle: {
    fontSize: screenWidth < 375 ? 18 : 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    lineHeight: screenWidth < 375 ? 20 : 24,
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
  },
  appSubtitle: {
    fontSize: screenWidth < 375 ? 10 : 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    letterSpacing: 0.3,
    marginTop: 1,
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
  },
  mobileControlsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'web' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    ...(Platform.OS === 'web' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    } : {
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    }),
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Platform.OS === 'web' ? '#1C1C1E' : '#FFFFFF',
    fontWeight: '500',
  },
  clearButton: {
    marginLeft: 6,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationButton: {
    position: 'relative',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  notificationDropdown: {
    position: 'absolute',
    top: '100%',
    right: 16,
    width: Math.min(screenWidth - 32, 320),
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
    zIndex: 1001,
  },
  dropdownGradient: {
    flex: 1,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  unreadText: {
    color: '#43b0a1',
  },
  notificationTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  notificationMessage: {
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 16,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#43b0a1',
    marginLeft: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterPillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filterText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  filterTextActive: {
    color: '#43b0a1',
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#43b0a1',
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#43b0a1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#43b0a1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  bottomSheetGradient: {
    padding: 24,
    paddingBottom: 40,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#C7C7CC',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetContent: {
    alignItems: 'center',
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  bottomSheetSupplier: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  bottomSheetAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#43b0a1',
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#43b0a1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 120,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});