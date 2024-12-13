import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <UIContext.Provider value={{ showToast, hideToast, showLoading, hideLoading }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      {loading && <LoadingSpinner fullScreen />}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIContext;
