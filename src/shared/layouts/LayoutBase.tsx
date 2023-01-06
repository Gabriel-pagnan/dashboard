import { Icon, IconButton, Typography, useMediaQuery, useTheme, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseProps{
    children: ReactNode;
    title: string;
    
}
export const LayoutBase: React.FC<ILayoutBaseProps> = ({children, title}) =>{
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();
  const {toggleDrawerOpen} = useDrawerContext();

  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box padding={1} display='flex' alignItems='center' height={theme.spacing(10)} gap={1}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>)}

        <Typography variant='h5'>
          {title}
        </Typography>
      </Box>
      <Box>
        Barra de ferramentas
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  );
};