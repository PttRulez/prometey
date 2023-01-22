import { FC, useLayoutEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { logout, setAuth } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import routes from '../router/routes';
import { fetchNetworksList } from '../store/selectListsSlice';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { authenticated } = authState;
  const location = useLocation();

  useLayoutEffect(() => {
    const getFn = async () => {
      try {
        const res = await AuthService.getUserProfile();
        dispatch(
          setAuth({ ...authState, authenticated: true, user: res.data })
        );
        dispatch(fetchNetworksList());
      } catch (err) {
        if (err.response.status === 401) {
          dispatch(logout());
        }
        console.log('Auth component getUserProfile error', err);
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
