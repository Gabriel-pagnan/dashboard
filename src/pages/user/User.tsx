import { Box, Button, Card, CardContent, CircularProgress, Fab, Icon, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import {UsersService} from '../../shared/services/api/users/UsersService';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useVForm, VForm, VTextField } from '../../shared/forms';

interface IFormData {
  email: string,
  name: string,
  senha: string
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(4),
  senha: yup.string().required().min(6),
  email: yup.string().required().email(),
});

export const User: React.FC = () => {
  const { formRef, save } = useVForm();
  const navigate = useNavigate();

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados)
      .then((dadosValid) => {
        UsersService.create(dadosValid)
          .then((result) => {
            if (result instanceof Error) {
              toast.error(result.message);
            } else {
              toast.success('Usuário registrado com sucesso.');
              navigate('/home');
            }
          });
      });
  };

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={4} padding={4} width={300} height={300}>

            <Typography variant='h6' align='center' display='flex' alignItems='center' gap={2} width={300}>
              Cadastrar
            </Typography>

            <VForm ref={formRef} onSubmit={handleSave}>
              <Box gap={4} display='flex' alignItems='center' justifyContent='center' flexDirection='column'>

                <VTextField fullWidth size='small' name='name' label='Usuário' />

                <VTextField fullWidth size='small' name='email' type='email' label='Email' />

                <VTextField fullWidth label='Senha' name='senha' size='small' type='password' />

                <Button variant='contained' fullWidth onClick={save}>
                  Cadastrar
                </Button>
              </Box>
            </VForm>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};