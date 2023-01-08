import { Box } from '@mui/system';
import { Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IFerramentaDetalhe {
    textNewBotton?: string;
    showNewButton?: boolean;
    showBackButton?: boolean;
    showDeleteButton?: boolean;
    showSaveButton?: boolean;
    showSaveBackButton?: boolean;
    handleClickNew?: ()=> void; 
    handleClickBack?: ()=> void; 
    handleClickDelete?: ()=> void; 
    handleClickSave?: ()=> void; 
    handleClickSaveBack?: ()=> void; 
}

export const FerramentaDetalhe: React.FC<IFerramentaDetalhe> = ({
  textNewBotton = 'Novo',
  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveBackButton = false,

  handleClickNew, 
  handleClickBack, 
  handleClickDelete, 
  handleClickSave, 
  handleClickSaveBack,
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
      gap={2}>

      {(showSaveButton && <Button variant='contained' color='primary' disableElevation startIcon={
        <Icon>save</Icon> } onClick={handleClickSave}>
        Salvar
      </Button>)} 

      {(showSaveBackButton && <Button variant='contained' color='primary' disableElevation startIcon={
        <Icon>save</Icon> } onClick={handleClickSaveBack}>
        Salvar e voltar
      </Button>)}

      <Divider orientation="vertical" flexItem/>

      {(showDeleteButton && <Button variant='contained' color='error' disableElevation startIcon={
        <Icon>delete</Icon> } onClick={handleClickDelete}>
        Apagar
      </Button>)}   

      {(showNewButton && <Button variant='contained' color='success' disableElevation startIcon={
        <Icon>add</Icon> } onClick={handleClickNew}>
        {textNewBotton}
      </Button>)}

      <Divider orientation="vertical" flexItem/>

      {(showBackButton && <Button variant='contained' color='warning' disableElevation startIcon={
        <Icon>reply</Icon> } onClick={handleClickBack}>
        voltar
      </Button> )}  
    </Box>
  );
};