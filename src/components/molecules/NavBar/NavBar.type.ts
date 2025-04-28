interface Notification {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }
  
  export interface NavBarProps {
    notification?: Notification | null;
    setNotification: (notification: Notification | null) => void;
    CreateOnClick: () => void;
  }