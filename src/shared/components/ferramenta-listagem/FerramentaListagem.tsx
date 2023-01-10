import { Button, Icon, TextField, Paper, useTheme, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { Environment } from '../../environment';

interface IFerramentaListagemProps {
    textInput?: string;
    showInputSearch?: boolean;
    changeTextSearch?: (newText: string) => void;
    textNewButton?: string;
    showNewButton?: boolean;
    clickNewButton?: () => void;
}

export const FerramentaListagem: React.FC<IFerramentaListagemProps> = ({ 
  textInput: text = '', 
  showInputSearch = false, 
  changeTextSearch, 
  textNewButton = 'Novo',
  showNewButton = true,
  clickNewButton,
}) => {
  const theme = useTheme();
  return(
    <Box 
      component={Paper} 
      display='flex' 
      alignItems='center'
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      gap={1}>

      {(showInputSearch && <Box>
        <TextField size='small' label={Environment.INPUT_BUSCA} onChange={(e) => changeTextSearch?.(e.target.value)} value={text}/>
        <IconButton type="button" aria-label="search">
          <Icon>search</Icon>
        </IconButton>
      </Box>)}

      <Box flex={1} display='flex' justifyContent='end'>
        {(showNewButton && 
        <Button variant='contained' color='primary' disableElevation startIcon={
          <Icon>add</Icon> } onClick={clickNewButton}>
          {textNewButton}
        </Button>)}
      </Box>
    </Box>
  );
};