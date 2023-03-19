import { FC, useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextInput from '../../../components/ui/NonFormInputs/TextInput';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useDebounce from '../../../hooks/useDebounce';
import {
  useGetAffiliatesListQuery,
  useGetNetworkListQuery,
} from '../../../api/selectListsApiSlice';
import SelectInput from '../../../components/ui/NonFormInputs/SelectInput';
import { SelectChangeEvent } from '@mui/material';
import { setAccountsFilters } from '../../../store/filtersSlice';

const AccountsFilters: FC = () => {
  const dispatch = useAppDispatch();
  const accountsFilters = useAppSelector((state) => state.filters.accounts);
  const { data: networkList } = useGetNetworkListQuery();
  const { data: affiliateList } = useGetAffiliatesListQuery();

  const [nickname, setNickname] = useState(accountsFilters.nickname);
  const debouncedNickname = useDebounce(nickname, 1000);

  useEffect(() => {
    dispatch(
      setAccountsFilters({ ...accountsFilters, nickname: debouncedNickname })
    );
  }, [dispatch, debouncedNickname]);

  const [login, setLogin] = useState(accountsFilters.login);
  const debouncedLogin = useDebounce(login, 1000);
  useEffect(() => {
    dispatch(setAccountsFilters({ ...accountsFilters, login: debouncedLogin }));
  }, [dispatch, debouncedLogin]);

  const [bobId, setBobId] = useState(accountsFilters.bob_id);
  const debouncedBobId = useDebounce(bobId, 1000);
  useEffect(() => {
    dispatch(
      setAccountsFilters({ ...accountsFilters, bob_id: debouncedBobId })
    );
  }, [dispatch, debouncedBobId]);

  return (
    <Grid spacing={3} container>
      <Grid>
        <TextInput
          label="Никнейм"
          handleClear={() => setNickname('')}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <TextInput
          label="Логин"
          handleClear={() => setLogin('')}
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <TextInput
          label="Боб Айди"
          handleClear={() => setBobId('')}
          value={bobId}
          onChange={(e) => {
            setBobId(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SelectInput
          handleClear={() => {
            console.log('NETWORK');
            dispatch(
              setAccountsFilters({ ...accountsFilters, network_id: '' })
            );
          }}
          label="Сеть"
          options={networkList ?? []}
          value={accountsFilters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e: SelectChangeEvent) => {
            dispatch(
              setAccountsFilters({
                ...accountsFilters,
                network_id: Number(e.target.value),
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(
              setAccountsFilters({ ...accountsFilters, affiliate_id: '' })
            )
          }
          label="Аффилейт"
          options={affiliateList ?? []}
          value={accountsFilters.affiliate_id}
          sx={{ minWidth: 200 }}
          onChange={(e: SelectChangeEvent) => {
            dispatch(
              setAccountsFilters({
                ...accountsFilters,
                affiliate_id: Number(e.target.value),
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default AccountsFilters;
