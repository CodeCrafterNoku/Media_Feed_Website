Media Feed App:

This project is a small mobile media feed application built with React Native, Expo, and TypeScript. The app showcases key mobile development concepts, including infinite scrolling, image optimization, local notifications, and robust error handling.



Objective
The objective of this app is to provide a clean, efficient, and user-friendly experience for browsing a feed of media items. It demonstrates several essential features:

Paginated Loading: It uses an infinite scroll and pull-to-refresh mechanism to load data from a mock API, handling network delays and errors gracefully.

Image Optimization: The app uses expo-image for optimized image loading with caching, progressive loading (from a low-quality thumbnail to a high-quality image), and prefetching of images for a smooth user experience.

Local Notifications: Users can tap a "Remind me" button to schedule a local notification. Tapping this notification deep-links directly to the corresponding item within the app.



Tech Stack & Rules 
Platform: Expo Go, React Native, TypeScript.

Core Libraries: expo-image, expo-notifications.

State Management: React hooks only.

Data: The app uses a local mock API to simulate a remote data source.

Testing: A single unit test is included for a pure utility function.

Timebox: The entire project was completed within a 60-minute timebox.



Features
Pagination
The feed is built using a FlatList to efficiently render a large number of items. It implements:

Infinite Scrolling: When the user scrolls near the end of the list, a new page of data is automatically loaded using the onEndReached prop.

Pull-to-Refresh: A RefreshControl allows users to pull down on the list to fetch the first page of data again, ensuring they have the most up-to-date content.

Resilience: The mock API simulates a 600ms network delay and a 10% error rate. The app handles these errors by displaying an informative error message with a "Retry" button.

Image Optimization
The expo-image library is used to handle all image-related tasks efficiently.

Progressive Loading: Images load progressively, showing a low-quality thumbnail first (thumbnailUrl) before the full-resolution image (imageUrl) is loaded.

Caching: expo-image automatically caches images to prevent re-downloads on subsequent views.

Prefetching: The app prefetches images for the next page of data, ensuring they are ready to be displayed as soon as the user scrolls down, minimizing load times.

Notifications
Permission Request: The app requests notification permissions upon startup and gracefully handles cases where the user denies permission.

Scheduling: A "Remind me" button appears on items due within the next 24 hours. Tapping it schedules a local notification for the specified dueAt time, or for 5 seconds from now if the due date is too close.

Deep-linking: Tapping a notification navigates the user directly to the corresponding item's detail view within the app.

Accessibility (A11y) & UX
Clear States: The user interface provides clear feedback for all states, including a loading spinner, an error message with a retry option, and an "end of list" indicator.

Accessibility: All interactive elements, such as buttons and images, have meaningful accessibilityRole and accessibilityLabel props to enhance usability for users with disabilities.



Unit Test
A simple unit test is included in src/utils/time.test.ts to verify the logic of the isDueWithin24h pure function. This test ensures the function correctly identifies deadlines that are due within 24 hours from the current time.



Installation and Run Instructions:

1.Create a new Expo project with TypeScript:
npx create-expo-app -t blank typescript


2.Install the necessary packages:
npm i expo-image expo-notifications

3.Add the provided project files into their respective locations in your new project directory.

4.Run the app:
npm start

Open the app in Expo Go on your physical device or a simulator to see it in action.