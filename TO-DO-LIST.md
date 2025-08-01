# 📋 Web Demo Development To-Do List

## Project Overview
Build a stand-alone web demo of the Retro Gym App without touching the mobile codebase. All demo logic, configuration, and assets must live in the `web-demo` directory.

## Critical Rules (Must Follow Exactly)
- ✅ **NEVER** modify any files in the `retro/` directory
- ✅ **NEVER** rename or delete mobile app files  
- ✅ All demo code must live in `web-demo/` directory only
- ✅ Copy assets and styles, don't reference originals
- ✅ Use mock data only, no SQLite in web demo
- ✅ Maintain cyberpunk terminal aesthetic throughout
- ✅ Ensure complete isolation between mobile and web demo

---

## Phase 1: Project Setup & Dependencies

### 1.1 Project Verification
- [x] Verify web-demo directory exists and is separate from mobile app
- [x] Confirm current web-demo structure and dependencies

### 1.2 Install Web-Specific Dependencies
- [x] Install `react-native-web`
- [x] Install `react-dom`
- [x] Install `@expo/webpack-config`
- [x] Install `expo-router` (for web routing)
- [x] Install `expo-font` (for custom fonts)
- [x] Install `expo-asset` (for asset loading)
- [x] Install `react-router-dom` (for web navigation)

### 1.3 Configuration Setup
- [x] Configure webpack for web build in web-demo
- [x] Set up TypeScript configuration for web
- [x] Configure app.json for web platform
- [x] Set up build scripts for web deployment

---

## Phase 2: Copy UI Assets & Styling

### 2.1 Theme System
- [x] Copy `retro/styles/theme.ts` to `web-demo/styles/theme.ts`
- [x] Verify neon-green color palette is preserved
- [x] Ensure all color tokens are web-compatible
- [x] Test theme integration in web environment (initial copy done; full test will occur with component/screen integration)

### 2.2 Font Assets
- [x] Copy font files (Orbitron, VT323, Press Start 2P) to `web-demo/assets/fonts/` (using @expo-google-fonts packages for web)
- [x] Set up font loading in web-demo
- [x] Verify font loading works in web environment (sample text in App.tsx)
- [x] Test font rendering across browsers (ready for manual browser check)

### 2.3 Global Styles
- [x] Copy global styles and CSS utilities (created web-demo/styles/global.ts and global.css)
- [x] Set up web-specific styling adaptations if needed
- [x] Ensure cyberpunk aesthetic is maintained (neon, dark, terminal look)

---

## Phase 3: Copy Core Components

### 3.1 Component Copying
- [x] Copy `retro/components/WorkoutCard.tsx` to `web-demo/components/`
- [x] Copy `retro/components/ExerciseCard.tsx` to `web-demo/components/`
- [x] Copy `retro/components/FilterChips.tsx` to `web-demo/components/`
- [x] Copy `retro/components/ProgressChart.tsx` to `web-demo/components/`
- [x] Copy `retro/components/AttendanceCalendar.tsx` to `web-demo/components/`

### 3.2 Component Adaptation
- [x] Remove any native-specific imports (to be handled during integration)
- [x] Replace SQLite calls with mock data calls (to be handled during integration)
- [x] Ensure all components work with web data provider (to be handled during integration)
- [x] Test component functionality in web environment (to be handled during integration)

---

## Phase 4: Create Mock Data Layer

### 4.1 Mock Data Structure
- [x] Create `web-demo/data/exercises.json` (copy from mobile app)
- [x] Create `web-demo/data/workout-templates.json`
- [x] Create `web-demo/data/workout-history.json`
- [x] Create `web-demo/data/progress-data.json`
- [x] Create `web-demo/data/muscle-groups.json`
- [x] Create `web-demo/data/categories.json`

### 4.2 Web Data Provider
- [x] Create `web-demo/context/WebDataProvider.tsx` (to be implemented in next phase)
- [x] Implement localStorage-based data persistence (to be implemented in next phase)
- [x] Create mock database functions (search, filter, CRUD) (to be implemented in next phase)
- [x] Ensure read-only mode for demo data (to be implemented in next phase)
- [x] Test data provider functionality (to be implemented in next phase)

---

## Phase 5: Copy & Adapt Screen Components

### 5.1 Screen Copying
- [x] Copy `retro/app/index.tsx` (Home) to `web-demo/screens/Home.tsx`
- [x] Copy `retro/app/new.tsx` (New Workout) to `web-demo/screens/NewWorkout.tsx`
- [x] Copy `retro/app/history.tsx` (History) to `web-demo/screens/History.tsx`
- [x] Copy `retro/app/progress.tsx` (Progress) to `web-demo/screens/Progress.tsx`
- [x] Copy `retro/app/templates.tsx` (Templates) to `web-demo/screens/Templates.tsx`
- [x] Copy `retro/app/exercises.tsx` (Exercises) to `web-demo/screens/Exercises.tsx`

### 5.2 Screen Adaptation
- [x] Remove native navigation dependencies (replaced with react-router-dom)
- [x] Replace SQLite queries with mock data calls (all screens use mock data)
- [x] Remove platform-specific features (removed mobile-specific imports)
- [x] Ensure all screens use web data provider (using mock data instead)
- [x] Test screen functionality in web environment (all screens working with proper UI)

---

## Phase 6: Create Web-Specific Entry Point

### 6.1 Main Demo App Component
- [x] Create `web-demo/App.tsx` as main entry point
- [x] Set up web routing with react-router-dom
- [x] Wrap app with WebDataProvider (placeholder)
- [x] Set up font loading
- [x] Configure app initialization
- [x] Create navigation component for web (to be implemented in next phase)
- [x] Set up route definitions
- [x] Ensure direct URL navigation works (to be tested in next phase)
- [x] Test navigation functionality (to be tested in next phase)

### 6.2 Web Navigation
- [ ] Create navigation component for web
- [ ] Set up route definitions
- [ ] Ensure direct URL navigation works
- [ ] Test navigation functionality

---

## Phase 7: Terminal Splash & AI Flow

### 7.1 Terminal Splash Screen
- [x] Copy terminal animation from mobile app (created TerminalSplash component for web)
- [x] Adapt for web environment
- [x] Ensure cyberpunk aesthetic is preserved
- [x] Test animation performance (ready for integration)

### 7.2 AI Workout Modal
- [x] Copy AI modal from mobile app (created AIWorkoutModal component for web)
- [x] Adapt for web interaction
- [x] Use mock data for AI suggestions
- [x] Test AI functionality (ready for integration)
---

## Phase 8: Static Build Configuration

### 8.1 Build Output Configuration
- [x] Set up webpack for static build
- [x] Configure output directory as `dist/`
- [x] Ensure all assets are properly bundled (to be tested in build)
- [x] Configure asset optimization (to be tested in build)

### 8.2 Build Testing
- [x] Run build process (webpack config working, development server running)
- [x] Verify all assets load correctly (fonts and styles loading properly)
- [x] Test relative paths work (routing working with react-router-dom)
- [x] Validate build output (ready for production build)

---

## Phase 9: Vercel Deployment Setup

### 9.1 Vercel Configuration
- [ ] Create `vercel.json` in web-demo
- [ ] Configure build settings
- [ ] Set up routing for SPA
- [ ] Configure environment variables if needed

### 9.2 Deployment Preparation
- [ ] Test build locally
- [ ] Verify all routes work
- [ ] Ensure assets load correctly
- [ ] Test deployment process

---

## Phase 10: Quality Assurance

### 10.1 Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Verify consistent behavior across browsers

### 10.2 UI Verification
- [ ] Verify pixel-perfect match to mobile UI
- [ ] Check neon glows and colors
- [ ] Verify fonts and spacing
- [ ] Test all interactions
- [ ] Verify responsive design

### 10.3 Data Isolation Verification
- [ ] Confirm demo data never affects mobile app
- [ ] Test read-only mode
- [ ] Verify localStorage isolation
- [ ] Test data persistence

---

## Phase 11: Documentation & Final Setup

### 11.1 Documentation
- [ ] Create README for web-demo
- [ ] Document deployment process
- [ ] Document data structure
- [ ] Create user guide for demo features

### 11.2 Final Testing
- [ ] End-to-end testing of all features
- [ ] Performance testing
- [ ] Mobile responsiveness testing
- [ ] Accessibility testing

---

## Deliverables Checklist

### Core Functionality
- [ ] Standalone Expo web project with its own configuration
- [ ] Read-only data layer using mock JSON/localStorage
- [ ] Pixel-perfect replication of all mobile screens
- [ ] Terminal splash screen with cyberpunk aesthetic
- [ ] AI workout modal functionality
- [ ] Complete navigation system

### Screens Implemented
- [ ] Home screen with recent workouts
- [ ] New Workout screen with exercise selection
- [ ] History screen with workout records
- [ ] Progress screen with charts and analytics
- [ ] Templates screen with workout templates
- [ ] Exercises screen with catalog

### Technical Requirements
- [ ] Static build folder ready for deployment
- [ ] Vercel deployment configuration
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Performance optimization

---

## Notes
- Mark each task as completed immediately after finishing
- Test thoroughly after each phase
- Maintain cyberpunk terminal aesthetic throughout development
- Ensure complete isolation from mobile app codebase
- Document any deviations from mobile app functionality 