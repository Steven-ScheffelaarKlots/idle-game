import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import styles from './alert.module.css';

// Define alert types
export type AlertType = 'success' | 'error' | 'info';

// Interface for individual alert objects
export interface AlertItem {
  id: string;
  message: string;
  type: AlertType;
  timeout: number;
}

// Props for the Alert component
interface AlertProps {
  message: string;
  type?: AlertType;
  onClose: () => void;
  style?: React.CSSProperties;
}

// Props for the AlertProvider component
interface AlertProviderProps {
  children: ReactNode;
}

// Context interface
interface AlertContextType {
  addAlert: (message: string, type?: AlertType, timeout?: number) => void;
}

// Create context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Individual Alert component
export const Alert: React.FC<AlertProps> = ({ message, type = 'success', onClose, style }) => {
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Determine color based on type
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(74, 222, 128, 0.9)'; // Green
      case 'error':
        return 'rgba(248, 113, 113, 0.9)'; // Red
      case 'info':
        return 'rgba(96, 165, 250, 0.9)'; // Blue
      default:
        return 'rgba(74, 222, 128, 0.9)'; // Default green
    }
  };

  return (
    <div 
      className={styles.alert} 
      style={{ 
        ...style, 
        backgroundColor: getBackgroundColor(),
      }}
    >
      <div className={styles.message}>{message}</div>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

// AlertProvider component to manage alerts
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  // Add a new alert
  const addAlert = useCallback((message: string, type: AlertType = 'success', timeout: number = 3000) => {
    const id = Date.now().toString();
    
    setAlerts(currentAlerts => [
      ...currentAlerts,
      { id, message, type, timeout }
    ]);

    // Auto-remove the alert after timeout
    setTimeout(() => {
      setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
    }, timeout);
  }, []);

  // Remove an alert by id
  const removeAlert = useCallback((id: string) => {
    setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className={styles.alertContainer}>
        {alerts.map((alert, index) => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={() => removeAlert(alert.id)}
            style={{
              // Position from bottom based on index (newest at bottom)
              bottom: `${(alerts.length - 1 - index) * 60 + 20}px`
            }}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

// Custom hook to use alerts
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
