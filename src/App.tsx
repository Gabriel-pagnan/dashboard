import { DrawerProvider, AppThemeProvider } from './shared/contexts';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { SideBar } from './shared/components';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <SideBar>
            <AppRoutes />
          </SideBar>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};

