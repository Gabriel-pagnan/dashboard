import React from 'react';
import { AppThemeProvider } from './shared/contexts';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SideBar } from './shared/components';

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <SideBar>
          <AppRoutes />
        </SideBar>
      </BrowserRouter>
    </AppThemeProvider>

  );
};

