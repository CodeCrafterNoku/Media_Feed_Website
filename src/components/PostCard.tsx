import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, Platform } from "react-native";
import { Image } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../data/posts";
import { isDueWithin24h } from "../utils/time";
import { formatZar } from "../utils/money";

type Props = {
  post: Post;
  onRemind?: (post: Post) => void;
  onOpen?: (post: Post) => void;
};

export const PostCard: React.FC<Props> = ({ post, onRemind, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const [isReminderSet, setIsReminderSet] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const shimmer = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);
  const buttonScaleAnim = new Animated.Value(1);
  const buttonOpacityAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    Image.prefetch(post.imageUrl).catch(() => {});
  }, [post.imageUrl]);

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handleButtonPressIn = () => {
    setIsButtonPressed(true);
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    setIsButtonPressed(false);
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handleRemindPress = (e: any) => {
    e.stopPropagation();
    
    // Animation sequence for setting reminder
    Animated.sequence([
      Animated.spring(buttonScaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 1.1,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsReminderSet(true);
      onRemind?.(post);
    });
  };

  // For web hover effect only
  const handleWebHoverIn = () => {
    if (Platform.OS === 'web') {
      setIsButtonPressed(true);
      Animated.spring(buttonScaleAnim, {
        toValue: 1.05,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleWebHoverOut = () => {
    if (Platform.OS === 'web') {
      setIsButtonPressed(false);
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const getButtonStyle = () => {
    if (isReminderSet) {
      return [styles.remindGradient, styles.remindGradientSet];
    }
    if (isButtonPressed) {
      return [styles.remindGradient, styles.remindGradientPressed];
    }
    return styles.remindGradient;
  };

  return (
    <Animated.View style={[styles.cardContainer, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={() => onOpen?.(post)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${post.title} from ${post.supplier}`}
      >
        {/* Image Section */}
        <View style={styles.imageContainer}>
          {!loaded && (
            <Animated.View style={[styles.shimmerOverlay, { opacity: shimmerOpacity }]}>
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.8)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
            </Animated.View>
          )}
          
          <Image
  style={styles.image}
  source={{ uri: post.imageUrl }}
  resizeMode="cover"
/>

          
          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          
          {/* Due Badge */}
          {isDueWithin24h(post.dueAt) && (
            <View style={styles.dueBadge}>
              <Ionicons name="time" size={12} color="#FFFFFF" />
              <Text style={styles.dueText}>Due Soon</Text>
            </View>
          )}
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.textContent}>
            <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
            <View style={styles.supplierRow}>
              <Ionicons name="business" size={14} color="#8E8E93" />
              <Text style={styles.supplier}>{post.supplier}</Text>
            </View>
            <View style={styles.amountRow}>
              <Ionicons name="card" size={14} color="#34C759" />
              <Text style={styles.amount}>{formatZar(post.amountZar)}</Text>
            </View>
          </View>

          {/* Action Button */}
          {isDueWithin24h(post.dueAt) && (
            <Pressable
              onPress={handleRemindPress}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
              onHoverIn={handleWebHoverIn}
              onHoverOut={handleWebHoverOut}
              style={styles.remindButton}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Set reminder for ${post.title}`}
            >
              <Animated.View 
                style={[
                  getButtonStyle(),
                  { transform: [{ scale: buttonScaleAnim }] }
                ]}
              >
                <Ionicons 
                  name={isReminderSet ? "checkmark-done" : "notifications"} 
                  size={16} 
                  color="#FFFFFF" 
                />
                <Text style={styles.remindText}>
                  {isReminderSet ? "Set!" : "Remind"}
                </Text>
              </Animated.View>
            </Pressable>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: '#F2F2F7',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E5E5EA',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
    top: '60%',
  },
  dueBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  dueText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  contentSection: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
    lineHeight: 24,
  },
  supplierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  supplier: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34C759',
  },
  remindButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  remindGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
    minHeight: 44,
    backgroundColor: '#2e8b7d',
  },
  remindGradientPressed: {
    backgroundColor: '#1a6b5f', // Darker teal when pressed
  },
  remindGradientSet: {
    backgroundColor: '#34C759', // Green when reminder is set
  },
  remindText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});