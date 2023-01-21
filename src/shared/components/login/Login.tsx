import { useState } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Fab, Icon, Link, TextField, Typography } from '@mui/material';
import * as yup from 'yup';

import { useAuthContext } from '../../contexts';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    setIsLoading(true);
    setSuccess(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(dadosValidados => {
        login(dadosValidados.email, dadosValidados.password)
          .then(() => {
            setIsLoading(false);
          });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach(error => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return (
    <>{children}</>
  );

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Card>
        <CardContent>
          <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={3} padding={4} width={300}>

            <Typography variant='h6' align='center' display='flex' alignItems='center' gap={2}>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Fab aria-label="save" color="primary">
                  <Icon>lock_person</Icon>
                </Fab>
                {isLoading && (
                  <CircularProgress
                    size={68}
                    sx={{
                      position: 'absolute',
                      top: -6,
                      left: -6,
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
              Login 
            </Typography>

            <TextField
              fullWidth
              size='small'
              type='email'
              label='Email'
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label='Senha'
              size='small'
              type='password'
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              variant='contained'
              disabled={isLoading}
              onClick={handleSubmit}
              fullWidth>
                Entrar
            </Button>

            <Link href={!isAuthenticated ? '/register' : '/home'} underline='hover' fontFamily='sans-serif'>
                Criar conta
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};