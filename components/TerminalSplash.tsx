import React, { useEffect, useState } from 'react';

const splashLines = [
  'SYSTEM BOOTING..._',
  'LOADING CYBERPUNK MODULES..._',
  'NEON GRID ONLINE..._',
  'AI WORKOUT ENGINE READY..._',
  'WELCOME TO RETRO GYM TERMINAL',
];

export default function TerminalSplash({ onFinish }: { onFinish?: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let line = splashLines[currentLine];
    let i = 0;
    setDisplayed('');
    const typeInterval = setInterval(() => {
      setDisplayed(line.slice(0, i + 1));
      i++;
      if (i >= line.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          if (currentLine < splashLines.length - 1) {
            setCurrentLine(currentLine + 1);
          } else if (onFinish) {
            onFinish();
          }
        }, 700);
      }
    }, 40);
    return () => clearInterval(typeInterval);
  }, [currentLine]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(c => !c), 400);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div style={{
      background: '#000',
      color: '#1DB954',
      fontFamily: 'VT323_400Regular, monospace',
      fontSize: 28,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: 2,
      textShadow: '0 0 8px #1DB954, 0 0 2px #00FF41',
    }}>
      <div style={{ width: 480, maxWidth: '90%', minHeight: 200, background: 'rgba(0,0,0,0.85)', border: '2px solid #1DB954', borderRadius: 12, padding: 32, boxShadow: '0 0 32px #1DB95455', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {splashLines.slice(0, currentLine).map((line, idx) => (
          <div key={idx}>{line.replace(/_$/, '')}</div>
        ))}
        <div>
          {displayed.replace(/_$/, '')}
          <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </div>
      </div>
    </div>
  );
}