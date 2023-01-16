import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FerramentaDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm, currencies } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { Box, Button, CircularProgress, Grid, Icon, MenuItem, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

interface IFormData {
  name: string;
  uf: string
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(4),
  uf: yup.string().required().min(2),
});


export const DetalheCidades: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const clear = () => {
    formRef.current?.setData({
      name: '',
    });
  };

  useEffect(() => {
    if (id !== 'novo') {
      setIsLoading(true);

      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            toast.error(result.message);
            navigate('/cidades');
          } else {
            setName(result.name);
            formRef.current?.setData(result);
          }
        });
    } else {
      clear();
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValid) => {
        setIsLoading(true);

        if (id === 'novo') {
          CidadesService.create(dadosValid)
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                toast.error(result.message);
              } else {
                toast.success('Cadastro salvo.');
                if (isSaveAndClose()) {
                  navigate('/cidades');
                } else {
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        } else {
          CidadesService.updateById(Number(id), { id: Number(id), ...dadosValid })
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                toast.error(result.message);
              } else {
                toast.success('Atualizado com sucesso.');
                if (isSaveAndClose()) {
                  navigate('/cidades');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validateErrors: {[key: string]: string} = {};
        errors.inner.forEach(error => {
          if(!error.path) return;
          validateErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validateErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja apagar este registro?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            toast.error(result.message);
          } else {
            toast.success('Registro deletado.');
            navigate('/cidades');
          }
        });
    }
  };

  return (
    <LayoutBase
      title={(id !== 'novo') ? `${name}` : 'Cadastrar'}
      barraFerramentas={
        <FerramentaDetalhe
          showNewButton={id !== 'novo'}
          showDeleteButton={id !== 'novo'}
          showBackButton
          showSaveBackButton
          showSaveButton

          handleClickBack={() => navigate(id !== 'novo' ? '/cidades' : '/home')}
          handleClickNew={() => navigate('/cidades/detalhe/novo')}
          handleClickDelete={() => handleDelete(Number(id))}
          handleClickSave={save}
          handleClickSaveBack={saveAndClose}
        />
      }>

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={2} display='flex' flexDirection='column' component={Paper}>
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item display='flex' justifyContent='center'>
                <CircularProgress variant='indeterminate' />
              </Grid>
            )}
            <Grid item>
              <Typography variant='h6' display='flex' alignItems='center' gap={2} marginBottom={2}>
                <Icon>fact_check</Icon>
                Dados
              </Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={4} xl={2}>
                <VTextField variant='filled' label='Nome' name='name' fullWidth disabled={isLoading} onChange={e => setName(e.target.value)} />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={4} xl={2}>
                <VTextField variant='filled' label='UF' name='uf' fullWidth disabled={isLoading} select>
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </VTextField>
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={4} xl={2}>
                <Button fullWidth variant='contained' disabled={isLoading} color='primary' startIcon={<Icon>clear_all</Icon>} onClick={clear}>
                  Limpar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBase>
  );
};