import { Box } from '@mui/system';
import { Button, Divider, Icon, Paper, Skeleton, useTheme, Typography, useMediaQuery, Theme } from '@mui/material';

interface IFerramentaDetalhe {
    textNewBotton?: string;
    showNewButton?: boolean;
    showBackButton?: boolean;
    showDeleteButton?: boolean;
    showSaveButton?: boolean;
    showSaveBackButton?: boolean;

    showNewButtonLoading?: boolean;
    showBackButtonLoading?: boolean;
    showDeleteButtonLoading?: boolean;
    showSaveButtonLoading?: boolean;
    showSaveBackButtonLoading?: boolean;
    
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

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveBackButtonLoading = false,

  handleClickNew, 
  handleClickBack, 
  handleClickDelete, 
  handleClickSave, 
  handleClickSaveBack,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return(
    <Box 
      component={Paper} 
      display='flex' 
      alignItems='center'
      justifyContent={smDown? 'center' : 'flex-start'}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      gap={2}>

      {(showSaveButton && !showSaveButtonLoading) && (<Button variant='contained' color='primary' disableElevation startIcon={
        <Icon>save</Icon> } onClick={handleClickSave}>
        <Typography overflow='hidden' textOverflow='ellipsis' variant='button' whiteSpace='nowrap'>
          Salvar
        </Typography>
      </Button>)} 
      {showSaveButtonLoading && (<Skeleton width={109} height={69}/>)}

      {(showSaveBackButton && !showSaveBackButtonLoading && !smDown && !mdDown) && (<Button variant='contained' color='primary' disableElevation startIcon={
        <Icon>save</Icon> } onClick={handleClickSaveBack}>
        <Typography overflow='hidden' textOverflow='ellipsis' variant='button' whiteSpace='nowrap'>
          Salvar e Voltar
        </Typography>
      </Button>)}
      {(showSaveBackButtonLoading && !smDown) && (<Skeleton width={200} height={69}/>)}

      <Divider orientation="vertical" flexItem/>

      {(showDeleteButton && !showDeleteButtonLoading)&& (<Button variant='contained' color='error' disableElevation startIcon={
        <Icon>delete</Icon> } onClick={handleClickDelete}>
        <Typography overflow='hidden' textOverflow='ellipsis' variant='button' whiteSpace='nowrap'>
          Apagar
        </Typography>
      </Button>)}   
      {showDeleteButtonLoading && (<Skeleton width={109} height={69} />)}


      {(showNewButton && !showNewButtonLoading && !smDown) && (<Button variant='contained' color='success' disableElevation startIcon={
        <Icon>add</Icon> } onClick={handleClickNew}>
        <Typography overflow='hidden' textOverflow='ellipsis' variant='button' whiteSpace='nowrap'>
          {textNewBotton}
        </Typography>
      </Button>)}
      {showNewButtonLoading && (<Skeleton width={109} height={69}/>)}

      {
        (
          showBackButton &&
          (showNewButton || showDeleteButton || showSaveButton || showSaveBackButton)
        ) && (<Divider orientation="vertical" flexItem/>)
      }

      {(showBackButton && !showBackButtonLoading) && (<Button variant='contained' color='warning' disableElevation startIcon={
        <Icon>reply</Icon> } onClick={handleClickBack}>
        <Typography overflow='hidden' textOverflow='ellipsis' variant='button' whiteSpace='nowrap'>
          Voltar
        </Typography>
      </Button> )}  
      {showBackButtonLoading && (<Skeleton width={109} height={69}/>)}
    </Box>
  );
};