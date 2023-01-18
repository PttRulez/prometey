import { FC, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { logout, setAuth } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import routes from '../router/routes';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { authenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const getFn = async () => {
      if (!authenticated) {
        try {
          const res = await AuthService.getUserProfile();
          dispatch(setAuth({ authenticated: true, user: res.data }));
        } catch (err) {
          if (err.response.status === 401) {
            dispatch(logout());
          }
          console.log('Auth component getUserProfile error', err);
        }
      }
    };
    getFn();
  }, [authenticated, dispatch]);

  return authenticated || location.pathname === routes.login ? (
    <Outlet />
  ) : (
    <Navigate to={routes.login} state={{ from: location }} replace />
  );
};

export default Auth;
