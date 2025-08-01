# Retro Gym App - Web Demo

A standalone web demo of the Retro Gym App, featuring a cyberpunk aesthetic with neon green styling and full workout tracking functionality.

## 🎯 Features

- **Cyberpunk UI**: Neon green theme with retro terminal aesthetics
- **Workout Tracking**: Create, track, and manage workouts
- **Exercise Catalog**: Browse and search exercises by category
- **Progress Analytics**: View workout history and progress charts
- **Template System**: Save and reuse workout templates
- **Responsive Design**: Works on desktop and mobile browsers

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd web-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run web
```

4. Open your browser and navigate to `http://localhost:19006`

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run web` - Start the web development server
- `npm run android` - Start the Android development server
- `npm run ios` - Start the iOS development server
- `npm run build` - Build for production

## 🏗️ Project Structure

```
web-demo/
├── components/          # Reusable UI components
├── screens/            # Main application screens
├── styles/             # Global styles and theme
├── data/               # Mock data files
├── public/             # Static assets
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── webpack.config.js   # Webpack configuration
```

## 🎨 Screens

1. **Home Screen** (`/`) - Main dashboard with workout templates
2. **New Workout** (`/new`) - Create and track workouts
3. **History** (`/history`) - View workout history and statistics
4. **Progress** (`/progress`) - Analytics and progress charts
5. **Templates** (`/templates`) - Manage workout templates
6. **Exercises** (`/exercises`) - Browse exercise catalog

## 🛠️ Technology Stack

- **React Native Web** - Cross-platform UI framework
- **React Router DOM** - Client-side routing
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Webpack** - Module bundling

## 🎯 Key Features

### Workout Management
- Create new workouts with custom exercises
- Track sets, reps, and weights
- Timer functionality for workout sessions
- Save and load workout templates

### Exercise Catalog
- Search exercises by name or muscle group
- Filter by category (Chest, Back, Legs, etc.)
- View exercise details and equipment needed

### Progress Tracking
- Visual progress charts
- Workout history with statistics
- Performance analytics
- Time-based filtering (Month, Quarter, Year)

### Cyberpunk Aesthetic
- Neon green color scheme
- Retro terminal fonts
- Glowing effects and animations
- Dark theme throughout

## 🔧 Development

### Adding New Screens

1. Create a new screen component in `screens/`
2. Add the route to `App.tsx`
3. Update navigation as needed

### Styling

The app uses a consistent theme defined in `styles/theme.ts`. All colors, fonts, and spacing should follow this theme for consistency.

### Mock Data

The app uses mock data stored in `data/` directory. To add new data:

1. Create or update JSON files in `data/`
2. Import and use in your components
3. Follow the existing data structure

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploying to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploying to Netlify

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Original mobile app design and concept
- Cyberpunk aesthetic inspiration
- React Native Web community

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team. 