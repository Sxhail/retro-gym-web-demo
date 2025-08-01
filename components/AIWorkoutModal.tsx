import React from 'react';

const mockSuggestions = [
  'AI SUGGESTS: FULL BODY BLAST',
  '1. Bench Press (Barbell) - 4x8',
  '2. Pull Up (Assisted) - 3x10',
  '3. Goblet Squat (Kettlebell) - 4x12',
  '4. Shoulder Press (Machine) - 3x10',
  '5. Crunch - 3x20',
];

export default function AIWorkoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.92)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#111',
        border: '2px solid #1DB954',
        borderRadius: 16,
        padding: 36,
        minWidth: 340,
        maxWidth: '90vw',
        color: '#1DB954',
        fontFamily: 'VT323_400Regular, monospace',
        fontSize: 22,
        boxShadow: '0 0 32px #1DB95455',
        textShadow: '0 0 8px #1DB954, 0 0 2px #00FF41',
      }}>
        <div style={{ marginBottom: 18, fontSize: 28, fontFamily: 'Orbitron_700Bold, monospace', letterSpacing: 2 }}>AI Workout Suggestion</div>
        {mockSuggestions.map((line, idx) => (
          <div key={idx} style={{ marginBottom: 6 }}>{line}</div>
        ))}
        <button
          onClick={onClose}
          style={{
            marginTop: 24,
            background: '#1DB954',
            color: '#000',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontFamily: 'Orbitron_700Bold, monospace',
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 0 8px #1DB954',
          }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}