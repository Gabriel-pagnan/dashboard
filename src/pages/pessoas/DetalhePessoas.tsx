import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FerramentaDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm } from '../../shared/forms';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { Box, Button, CircularProgress, Grid, Icon, Paper, Typography } from '@mui/material';
import * as yup from 'yup';
import { AutoCompleteCidade } from './components/Auto-complete';

interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  cityId: yup.number().required(),
  email: yup.string().required('E-mail inválido.').email(),
  fullName: yup.string().required().min(4),
});

export const DetalhePessoas: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const clear = () => {
    formRef.current?.setData({
      fullName: '',
      email: '',
      cityId: undefined,
    });
  };

  useEffect(() => {
    if (id !== 'novo') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            toast.error(result.message);
            navigate('/pessoas');
          } else {
            setName(result.fullName);
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
          PessoasService.create(dadosValid)
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                toast.error(result.message);
              } else {
                toast.success('Cadastro salvo.');
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                } else {
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
        } else {
          PessoasService.updateById(Number(id), { id: Number(id), ...dadosValid })
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                toast.error(result.message);
              } else {
                toast.success('Atualizado com sucesso.');
                if (isSaveAndClose()) {
                  navigate('/pessoas');
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
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            toast.error(result.message);
          } else {
            toast.success('Registro deletado.');
            navigate('/pessoas');
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

          handleClickBack={() => navigate(id !== 'novo' ? '/pessoas' : '/home')}
          handleClickNew={() => navigate('/pessoas/detalhe/novo')}
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
                Dados pessoais
              </Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={4} xl={2}>
                <VTextField  variant='filled' label='Nome Completo' name='fullName' fullWidth disabled={isLoading} onChange={e => setName(e.target.value)} />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={4} xl={2}>
                <VTextField variant='filled' label='E-mail' name='email' fullWidth disabled={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
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