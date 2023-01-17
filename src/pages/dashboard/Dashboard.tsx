import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FerramentaDetalhe} from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const Dashboard = () =>{
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [fullCountCidades, setFullCountCidades] = useState(0);
  const [fullCountPessoas, setFullCountPessoas] = useState(0);

  // const navigate = useNavigate(); 

  useEffect(()=>{
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    CidadesService.getAll(1, '')
      .then((result) => {
        setIsLoadingCidades(false);

        if(result instanceof Error) {
          toast.error(result.message);
        }else{          
          setFullCountCidades(result.fullCount);
        }
      });
    
    PessoasService.getAll(1, '')
      .then((result) => {
        setIsLoadingPessoas(false);

        if(result instanceof Error) {
          toast.error(result.message);
        }else{          
          setFullCountPessoas(result.fullCount);
        }
      });
  }, []);

  return(
    <LayoutBase title='Página inicial'>
      <Box width='100%' display='flex'>
        <Grid container margin={3}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total de pessoas</Typography>
                  <Box padding={4} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingPessoas && (<Typography variant='h1'>
                      {fullCountPessoas}
                    </Typography>)}
                    
                    {isLoadingPessoas && (<Typography variant='h1'>
                      <CircularProgress />
                    </Typography>)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Total de cidades</Typography>
                  <Box padding={4} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCidades && (<Typography variant='h1'>
                      {fullCountCidades}
                    </Typography>)}

                    {isLoadingCidades && (<Typography variant='h1'>
                      <CircularProgress />
                    </Typography>)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBase>
  );
};

// barraFerramentas={(
//   <FerramentaDetalhe showBackButton={false} showDeleteButton={false} showSaveButton={false} handleClickNew={() => navigate('/pessoas/detalhe/novo')}/>
// )}