import { Avatar, Drawer, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { ReactNode } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';

interface ISideBarProps {
  children: ReactNode
}
interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({path: resolvedPath.pathname, end: false});

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const SideBar: React.FC<ISideBarProps> = ({children}) => {
  const theme = useTheme();
  const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box width='100%' height={theme.spacing(18)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar alt='profile' sx={{ height: theme.spacing(10), width: theme.spacing(10) }} />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map(drawerOption =>(
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path} 
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}/>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};