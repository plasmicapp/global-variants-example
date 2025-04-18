import React from 'react';
import { DataProvider } from '@plasmicapp/loader-nextjs';
import { useGlobalVariant } from '@/contexts/GlobalVariantContext';

interface DarkModeToggleWrapperProps {
  children?: React.ReactNode;
}

interface DarkModeToggleWrapperActions {
  toggleTheme(): void;
}
const DarkModeToggleWrapperBase = ({ children }: DarkModeToggleWrapperProps, ref: React.Ref<unknown>) => {
  const { isDarkMode, toggleDarkMode } = useGlobalVariant();

  React.useImperativeHandle(ref, () => ({
    toggleTheme: toggleDarkMode
  }));

  return (
    <DataProvider name="theme" data={{ isDarkMode }}>
      {children}
    </DataProvider>
  );
}

export const DarkModeToggleWrapper = React.forwardRef<DarkModeToggleWrapperActions, DarkModeToggleWrapperProps>(DarkModeToggleWrapperBase);