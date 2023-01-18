import { FC } from 'react';
import Select, { SelectOption } from '../../../components/ui/Select';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchTimeTable } from '../../../store/accountsSlice';

interface ITimeTableFilters extends FieldValues {
  network_id: string;
  affiliate_id: string;
}

const TimetableFilters: FC = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue, watch } = useForm<ITimeTableFilters>(
    {
      defaultValues: {
        network_id: '',
        affiliate_id: '',
      },
    }
  );

  const watchAll = watch();
  const options: SelectOption[] = [
    { title: 'Chico', value: 1 },
    { title: 'IPoker', value: 2 },
  ];

  const onSubmit: SubmitHandler<ITimeTableFilters> = (data) => {
    console.log('data', data);
    dispatch(fetchTimeTable(data));
  };

  return (
    <Grid
      container
      // alignItems="stretch"
      // sx={{ justifyContent: 'end' }}
      justifyContent={'flex-end'}
      spacing={2}
    >
      <Grid>
        <Select
          // @ts-expect-error
          control={control}
          handleClear={() => setValue('network_id', '')}
          label="Сеть"
          name="network_id"
          options={options}
          value={watchAll.network_id}
          sx={{ minWidth: 200 }}
        />
      </Grid>
      <Grid>
        <Select
          // @ts-expect-error
          control={control}
          handleClear={() => setValue('affiliate_id', '')}
          label="Аффилейт"
          name="affiliate_id"
          options={options}
          value={watchAll.affiliate_id}
          sx={{ minWidth: 200 }}
        />
      </Grid>
      <Grid>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
          sx={{ height: '100%' }}
        >
          Фильтр
        </Button>
      </Grid>
    </Grid>
  );
};

export default TimetableFilters;
