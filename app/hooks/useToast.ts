import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const toastStyle = {
  border: '1px solid #1DA1F2',
  padding: '8px',
  color: 'white',
  backgroundColor: '#14171A',
};

const toastStyleError = {
  border: '1px solid #ef4444',
  padding: '8px',
  color: 'white',
  backgroundColor: '#14171A',
};

const iconTheme = {
  primary: '#1DA1F2',
  secondary: 'white',
};

const useToast = () => {
  const success = useCallback((message: string, icon?: any) => {
    toast.success(message, {
      style: toastStyle,
      iconTheme,
      icon,
    });
  }, []);

  const error = useCallback((message: string, icon?: any) => {
    toast.error(message, {
      style: toastStyleError,
    });
  }, []);

  return { success, error };
};

export default useToast;
