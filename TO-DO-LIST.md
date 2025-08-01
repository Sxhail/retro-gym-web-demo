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
- [ ] Copy `retro/styles/theme.ts` to `web-demo/styles/theme.ts`
- [ ] Verify neon-green color palette is preserved
- [ ] Ensure all color tokens are web-compatible
- [ ] Test theme integration in web environment

### 2.2 Font Assets
- [ ] Copy font files (Orbitron, VT323, Press Start 2P) to `web-demo/assets/fonts/`
- [ ] Set up font loading in web-demo
- [ ] Verify font loading works in web environment
- [ ] Test font rendering across browsers

### 2.3 Global Styles
- [ ] Copy global styles and CSS utilities
- [ ] Set up web-specific styling adaptations if needed
- [ ] Ensure cyberpunk aesthetic is maintained

---

## Phase 3: Copy Core Components

### 3.1 Component Copying
- [ ] Copy `retro/components/WorkoutCard.tsx` to `web-demo/components/`
- [ ] Copy `retro/components/ExerciseCard.tsx` to `web-demo/components/`
- [ ] Copy `retro/components/FilterChips.tsx` to `web-demo/components/`
- [ ] Copy `retro/components/ProgressChart.tsx` to `web-demo/components/`
- [ ] Copy `retro/components/AttendanceCalendar.tsx` to `web-demo/components/`

### 3.2 Component Adaptation
- [ ] Remove any native-specific imports
- [ ] Replace SQLite calls with mock data calls
- [ ] Ensure all components work with web data provider
- [ ] Test component functionality in web environment

---

## Phase 4: Create Mock Data Layer

### 4.1 Mock Data Structure
- [ ] Create `web-demo/data/exercises.json` (copy from mobile app)
- [ ] Create `web-demo/data/workout-templates.json`
- [ ] Create `web-demo/data/workout-history.json`
- [ ] Create `web-demo/data/progress-data.json`
- [ ] Create `web-demo/data/muscle-groups.json`
- [ ] Create `web-demo/data/categories.json`

### 4.2 Web Data Provider
- [ ] Create `web-demo/context/WebDataProvider.tsx`
- [ ] Implement localStorage-based data persistence
- [ ] Create mock database functions (search, filter, CRUD)
- [ ] Ensure read-only mode for demo data
- [ ] Test data provider functionality

---

## Phase 5: Copy & Adapt Screen Components

### 5.1 Screen Copying
- [ ] Copy `retro/app/index.tsx` (Home) to `web-demo/screens/Home.tsx`
- [ ] Copy `retro/app/new.tsx` (New Workout) to `web-demo/screens/NewWorkout.tsx`
- [ ] Copy `retro/app/history.tsx` (History) to `web-demo/screens/History.tsx`
- [ ] Copy `retro/app/progress.tsx` (Progress) to `web-demo/screens/Progress.tsx`
- [ ] Copy `retro/app/templates.tsx` (Templates) to `web-demo/screens/Templates.tsx`
- [ ] Copy `retro/app/exercises.tsx` (Exercises) to `web-demo/screens/Exercises.tsx`

### 5.2 Screen Adaptation
- [ ] Remove native navigation dependencies
- [ ] Replace SQLite queries with mock data calls
- [ ] Remove platform-specific features
- [ ] Ensure all screens use web data provider
- [ ] Test screen functionality in web environment

---

## Phase 6: Create Web-Specific Entry Point

### 6.1 Main Demo App Component
- [ ] Create `web-demo/App.tsx` as main entry point
- [ ] Set up web routing with react-router-dom
- [ ] Wrap app with WebDataProvider
- [ ] Set up font loading
- [ ] Configure app initialization

### 6.2 Web Navigation
- [ ] Create navigation component for web
- [ ] Set up route definitions
- [ ] Ensure direct URL navigation works
- [ ] Test navigation functionality

---

## Phase 7: Terminal Splash & AI Flow

### 7.1 Terminal Splash Screen
- [ ] Copy terminal animation from mobile app
- [ ] Adapt for web environment
- [ ] Ensure cyberpunk aesthetic is preserved
- [ ] Test animation performance

### 7.2 AI Workout Modal
- [ ] Copy AI modal from mobile app
- [ ] Adapt for web interaction
- [ ] Use mock data for AI suggestions
- [ ] Test AI functionality

---

## Phase 8: Static Build Configuration

### 8.1 Build Output Configuration
- [ ] Set up webpack for static build
- [ ] Configure output directory as `dist/`
- [ ] Ensure all assets are properly bundled
- [ ] Configure asset optimization

### 8.2 Build Testing
- [ ] Run build process
- [ ] Verify all assets load correctly
- [ ] Test relative paths work
- [ ] Validate build output

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