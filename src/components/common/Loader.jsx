import React from 'react';

export default function Loader({ message = 'Fetching weather data...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: '24px' }}>
      {/* Animated weather icon stack */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{
          width: 80, height: 80,
          borderRadius: '50%',
          border: '3px solid rgba(45,150,105,0.2)',
          borderTopColor: '#2d9669',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontSize: 28,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>🌤</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#54b688', fontFamily: "'DM Sans', sans-serif", fontSize: 15, margin: 0, fontWeight: 500 }}>{message}</p>
        <p style={{ color: 'rgba(200,230,215,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, margin: '6px 0 0' }}>
          Analysing conditions for your event…
        </p>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:0.7; transform: translate(-50%,-50%) scale(1); } 50% { opacity:1; transform: translate(-50%,-50%) scale(1.15); } }
      `}</style>
    </div>
  );
}
