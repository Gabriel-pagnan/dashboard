import './shared/forms/TradutorYup';
import { DrawerProvider, AppThemeProvider, AuthProvider } from './shared/contexts';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Login, SideBar } from './shared/components';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>

          <DrawerProvider>
            <BrowserRouter>
              <SideBar>
                <AppRoutes />
              </SideBar>
            </BrowserRouter>
          </DrawerProvider>
          
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};

