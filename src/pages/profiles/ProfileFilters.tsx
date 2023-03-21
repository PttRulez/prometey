import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import SelectInput from '../../components/ui/NonFormInputs/SelectInput';
import { useGetNetworkListQuery } from '../../api/selectListsApiSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setProfilesFilters } from '../../store/filtersSlice';
import { SelectChangeEvent } from '@mui/material';

const ProfileFilters: FC = () => {
  const profilesFilters = useAppSelector((state) => state.filters.profiles);
  const dispatch = useAppDispatch();

  const { data: networkList } = useGetNetworkListQuery();

  return (
    <Grid spacing={3} container sx={{ marginBottom: '20px' }}>
      <Grid>
        <SelectInput
          handleClear={() => {
            dispatch(
              setProfilesFilters({ ...profilesFilters, network_id: '' })
            );
          }}
          label="Сеть"
          options={networkList ?? []}
          value={profilesFilters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e: SelectChangeEvent) => {
            dispatch(
              setProfilesFilters({
                ...profilesFilters,
                network_id: Number(e.target.value),
              })
            );
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default ProfileFilters;
