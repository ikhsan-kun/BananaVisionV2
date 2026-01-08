import React, { useState, useEffect } from 'react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShow(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!show) return null;

  return (
    <div style={{
      ...styles.container,
      background: isOnline ? '#10b981' : '#ef4444'
    }}>
      <span style={styles.icon}>{isOnline ? '✅' : '📡'}</span>
      <span style={styles.text}>
        {isOnline ? 'Kembali Online' : 'Mode Offline'}
      </span>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    color: 'white',
    padding: '12px 24px',
    borderRadius: '9999px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    fontWeight: '600'
  },
  icon: {
    fontSize: '18px'
  },
  text: {
    margin: 0
  }
};

export default OfflineIndicator;