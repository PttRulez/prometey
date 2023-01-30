import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Grid from '@mui/material/Unstable_Grid2';
import { setBobIdFilters } from '../../store/filtersSlice';
import SelectInput from '../../components/ui/NonFormInputs/SelectInput';
import TextInput from '../../components/ui/NonFormInputs/TextInput';
import useDebounce from '../../hooks/useDebounce';
import CheckboxInput from '../../components/ui/NonFormInputs/CheckboxInput';
import { useGetBobIdsQuery } from '../../api/bobIdsApiSlice';

const BobIdFilters: FC<{ [key: string]: any }> = (props) => {
  const dispatch = useAppDispatch();
  const bobIdFilters = useAppSelector((state) => state.filters.bobIds);
  const { data: bobIdsResponse } = useGetBobIdsQuery(bobIdFilters);
  const [bobIdInpuText, setBobIdInputText] = useState(bobIdFilters.bob_id);

  const debouncedBobId = useDebounce(bobIdInpuText, 1000);

  useEffect(() => {
    dispatch(setBobIdFilters({ ...bobIdFilters, bob_id: debouncedBobId }));
  }, [dispatch, debouncedBobId]);

  return (
    <Grid
      {...props}
      container
      justifyContent={'flex-end'}
      spacing={2}
      alignItems={'flex-end'}
    >
      <Grid>
        <SelectInput
          handleClear={() =>
            dispatch(setBobIdFilters({ ...bobIdFilters, network_id: '' }))
          }
          label="Сеть"
          options={bobIdsResponse?.networkList ?? []}
          value={bobIdFilters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setBobIdFilters({
                ...bobIdFilters,
                network_id: Number(e.target.value),
              })
            );
          }}
        />
      </Grid>
      <Grid>
        <TextInput
          handleClear={() => setBobIdInputText('')}
          label="Имя Боб Айди"
          value={bobIdInpuText}
          onChange={(e) => {
            setBobIdInputText(e.target.value);
          }}
        />
      </Grid>
      <Grid justifyItems={'flex-end'} alignItems={'end'}>
        <CheckboxInput
          label="Удалённые"
          checked={bobIdFilters.show_deleted}
          onChange={(e) => {
            console.log(e.target.checked);
            dispatch(
              setBobIdFilters({
                ...bobIdFilters,
                show_deleted: e.target.checked,
              })
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default BobIdFilters;
