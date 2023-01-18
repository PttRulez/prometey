import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/authSlice';
import { Credentials } from '../../types/slices/AuthSliceTypes';
import { LoadingButton } from '@mui/lab';
import { Navigate, useNavigate } from 'react-router-dom';
import routes from '../../router/routes';

const Login: FC = () => {
  const { handleSubmit, register } = useForm<Credentials>();
  const dispatch = useAppDispatch();
  const { authenticated, loading } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Credentials> = data => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (authenticated) {
      navigate(routes.home);
    }
  }, [authenticated, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        gap: 1,
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 4,
          minWidth: 500,
          border: '1px solid',
          borderColor: 'grey.A400',
          borderRadius: 6,
          padding: 4,
        }}
      >
        <TextField label='Логин' variant='standard' {...register('email')} />
        <TextField label='Пароль' variant='standard' type='password' {...register('password')} />
        <LoadingButton variant='outlined' color='inherit' type='submit' loading={loading}>
          Логин
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Login;
