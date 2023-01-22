import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Grid from '@mui/material/Unstable_Grid2';
import { setBobIdFilters } from '../../store/bobIdsSlice';
import SelectInput from '../../components/ui/NonFormInputs/SelectInput';
import TextInput from '../../components/ui/NonFormInputs/TextInput';
import useDebounce from '../../hooks/useDebounce';
import CheckboxInput from '../../components/ui/NonFormInputs/CheckboxInput';

const BobIdFilters: FC<{ [key: string]: any }> = (props) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.bobIds.filters);
  const networkList = useAppSelector((state) => state.selectLists.networksList);
  const [bobIdInpuText, setBobIdInputText] = useState(filters.bob_id);

  const debouncedBobId = useDebounce(bobIdInpuText, 1000);

  useEffect(() => {
    dispatch(setBobIdFilters({ ...filters, bob_id: debouncedBobId }));
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
            dispatch(setBobIdFilters({ ...filters, network_id: '' }))
          }
          label="Сеть"
          options={networkList}
          value={filters.network_id}
          sx={{ minWidth: 200 }}
          onChange={(e) => {
            dispatch(
              setBobIdFilters({
                ...filters,
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
          checked={filters.show_deleted}
          onChange={(e) => {
            console.log(e.target.checked);
            dispatch(
              setBobIdFilters({ ...filters, show_deleted: e.target.checked })
            );
          }}
        />
      </Grid>
    </Grid>
  );
};

export default BobIdFilters;
