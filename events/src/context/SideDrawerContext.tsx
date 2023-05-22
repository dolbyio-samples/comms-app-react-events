import { useState, createContext, useMemo, ReactNode, useCallback } from 'react';

type SideDrawerContext = {
  isDrawerOpen: boolean;
  contentType: SideDrawerContentTypes | null;
  openDrawer: (contentType: SideDrawerContentTypes) => void;
  closeDrawer: () => void;
};

export enum SideDrawerContentTypes {
  DEVICE_SETUP,
  PARTICIPANTS,
  CONFERENCE_SETTINGS,
  CHAT,
}

type AppProviderProps = { children: ReactNode };

export const SideDrawerContext = createContext<SideDrawerContext>({} as SideDrawerContext);

export const SideDrawerProvider = ({ children }: AppProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [contentType, setContentType] = useState<SideDrawerContext['contentType']>(null);

  const openDrawer = useCallback((contentType: SideDrawerContentTypes) => {
    setIsDrawerOpen(true);
    setContentType(contentType);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setContentType(null);
  }, []);

  const contextValue: SideDrawerContext = useMemo(
    () => ({
      isDrawerOpen,
      contentType,
      openDrawer,
      closeDrawer,
    }),
    [isDrawerOpen, contentType, openDrawer, closeDrawer],
  );

  return <SideDrawerContext.Provider value={contextValue}>{children}</SideDrawerContext.Provider>;
};
