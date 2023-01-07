import { Icon, IconButton, Typography, useMediaQuery, useTheme, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseProps{
    children: ReactNode;
    title: string;
    barraFerramentas?: ReactNode;
}
export const LayoutBase: React.FC<ILayoutBaseProps> = ({children, title, barraFerramentas}) =>{
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const {toggleDrawerOpen} = useDrawerContext();

  return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box padding={1} display='flex' alignItems='center' height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} gap={1}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>)}

        <Typography variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
          {title}
        </Typography>
      </Box>

      {barraFerramentas && (<Box>
        {barraFerramentas}
      </Box>)}

      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};