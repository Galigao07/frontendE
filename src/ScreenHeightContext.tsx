import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Type for context value
type ScreenSizeContextType = {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
};

// Props for provider
type ScreenSizeProviderProps = {
  children: ReactNode;
};

// Create context
const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

export const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({ children }) => {
  const getScreenSize = (): ScreenSizeContextType => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = height >= width ? 'portrait' : 'landscape';
    return { width, height, orientation };
  };

  const [screenSize, setScreenSize] = useState<ScreenSizeContextType>(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

// Custom hook
export const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }
  return context;
};
