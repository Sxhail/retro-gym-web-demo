import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useFonts as useOrbitron, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { useFonts as usePressStart2P, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts as useVT323, VT323_400Regular } from '@expo-google-fonts/vt323';
import { useFonts as useShareTechMono, ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
import './styles/global.css';

// Screens
import HomeScreen from './screens/Home';
import NewWorkoutScreen from './screens/NewWorkout';
import HistoryScreen from './screens/History';
import ProgressScreen from './screens/Progress';
import TemplatesScreen from './screens/Templates';
import ExercisesScreen from './screens/Exercises';

// Placeholder for WebDataProvider
const WebDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export default function App() {
  const [orbitronLoaded] = useOrbitron({ Orbitron_700Bold });
  const [pressStart2PLoaded] = usePressStart2P({ PressStart2P_400Regular });
  const [vt323Loaded] = useVT323({ VT323_400Regular });
  const [shareTechMonoLoaded] = useShareTechMono({ ShareTechMono_400Regular });
  const fontsLoaded = orbitronLoaded && pressStart2PLoaded && vt323Loaded && shareTechMonoLoaded;

  if (!fontsLoaded) {
    return <div style={{ color: '#1DB954', fontFamily: 'monospace', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading fonts...</div>;
  }

  return (
    <WebDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/new" element={<NewWorkoutScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/progress" element={<ProgressScreen />} />
          <Route path="/templates" element={<TemplatesScreen />} />
          <Route path="/exercises" element={<ExercisesScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </WebDataProvider>
  );
}
