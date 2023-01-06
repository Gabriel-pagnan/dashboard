import { Avatar, Drawer, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { ReactNode } from 'react';

interface ISideBarProps {
    children: ReactNode
}

export const SideBar: React.FC<ISideBarProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer variant='permanent'>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box width='100%' height={theme.spacing(18)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar alt='profile' sx={{height: theme.spacing(10), width: theme.spacing(10)}}/>
          </Box>

          <Divider />

          <Box flex={1}>
            <List component='nav'>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary='Home'/>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};