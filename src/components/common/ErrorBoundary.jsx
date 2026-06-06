import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message ?? 'Unknown error' };
  }

  componentDidCatch(error, info) {
    console.error('HaliWise error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '16px',
          background: '#070f07', color: '#e8f5e8', fontFamily: 'DM Sans, sans-serif',
          padding: '24px', textAlign: 'center',
        }}>
          <h2 style={{ margin: 0, color: '#d6f0d6' }}>Something went wrong</h2>
          <p style={{ color: '#8aab8a', maxWidth: '400px', margin: 0 }}>
            {this.state.message}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              marginTop: '8px', padding: '10px 24px', borderRadius: '10px',
              background: '#1a6b1a', color: '#e8f5e8', border: 'none',
              cursor: 'pointer', fontSize: '14px',
            }}
          >
            ← Start over
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}