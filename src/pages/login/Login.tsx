import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/authSlice';
import { Credentials } from '../../types/auth';
import { LoadingButton } from '@mui/lab';
import { useLocation, useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const { handleSubmit, register } = useForm<Credentials>();
  const dispatch = useAppDispatch();
  const { authenticated, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit: SubmitHandler<Credentials> = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (authenticated) {
      navigate(from, { replace: true });
    }
  }, [authenticated, from, navigate]);

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
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
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
        <TextField label="Логин" variant="standard" {...register('email')} />
        <TextField
          label="Пароль"
          variant="standard"
          type="password"
          {...register('password')}
        />
        <LoadingButton
          variant="outlined"
          color="inherit"
          type="submit"
          loading={loading}
        >
          Логин
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Login;
