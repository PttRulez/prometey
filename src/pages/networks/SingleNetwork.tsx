import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSingleNetwork } from '../../store/networksSlice';

const SingleNetwork: FC = () => {
  const dispatch = useAppDispatch();
  const network = useAppSelector((state) => state.networks.network);

  const { id } = useParams();

  useEffect(() => {
    id && dispatch(fetchSingleNetwork(id));
  }, [id, dispatch]);

  return (
    <>
      <Typography variant="h3">{network.name}</Typography>
      <Typography variant="body1">{network.info}</Typography>
    </>
  );
};

export default SingleNetwork;
