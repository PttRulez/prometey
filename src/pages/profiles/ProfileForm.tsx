import { FC } from 'react';
import { ProfileInForm } from '../../types/profiles';
import VerticalForm from '../../components/ui/Forms/VerticalForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import FormText from '../../components/ui/Forms/FormText';
import FormSelect from '../../components/ui/Forms/FormSelect';
import { Button, FormGroup } from '@mui/material';
import { openNotification } from '../../store/notificationSlice';
import {
  useAddProfileMutation,
  useUpdateProfileMutation,
} from '../../api/profilesApiSlice';
import {
  existingDisciplines,
  existinglimits,
  shifts,
} from '../../constants/common';
import Grid from '@mui/material/Unstable_Grid2';
import CheckboxInput from '../../components/ui/NonFormInputs/CheckboxInput';
import { useGetContractsQuery } from '../../api/contractsApiSlice';

type Props = {
  closeForm: () => void;
  profile: ProfileInForm;
};

const ProfileForm: FC<Props> = ({ closeForm, profile }) => {
  // В БД оставались null
  if (!profile.disciplines) profile.disciplines = [];
  if (!profile.limits) profile.limits = [];
console.log('profile', profile)
  const { control, handleSubmit, setValue, watch } = useForm<ProfileInForm>({
    defaultValues: profile,
  });
  const dispatch = useAppDispatch();
  const watchAll = watch();
  const [addProfile] = useAddProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const { data: contracts } = useGetContractsQuery();

  console.log('contracts', contracts)
  const onSubmit: SubmitHandler<ProfileInForm> = async (data) => {
    console.log('data', data);
    // return;
    if (data.id) {
      const result = await updateProfile(data);
      console.log('result', result);
      if ('error' in result) {
        dispatch(
          openNotification({
            type: 'error',
            text: 'Профиль НЕ смог обновиться',
          })
        );
      } else {
        dispatch(
          openNotification({
            type: 'success',
            text: 'Профиль успешно обновился',
          })
        );
        closeForm();
      }
    } else {
      const result = await addProfile(data);

      if ('error' in result) {
        dispatch(
          openNotification({
            type: 'error',
            text: 'Профиль НЕ создался',
          })
        );
      } else {
        dispatch(
          openNotification({ type: 'success', text: 'Профиль создался' })
        );
        closeForm();
      }
    }
  };

  return (
    <VerticalForm
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      sx={{ minWidth: '500px', backgroundColor: 'white' }}
    >
      <FormText
        //@ts-ignore
        control={control}
        handleClear={() => setValue('name', '')}
        label="Название профиля"
        name="name"
        value={watchAll.name}
      />
      <FormSelect
        // @ts-ignore
        control={control}
        handleClear={() => setValue('contract_id', '')}
        label="Контракт"
        name="contract_id"
        //@ts-ignore
        options={contracts ?? []}
        value={watchAll.contract_id}
      />
      <FormSelect
        // @ts-ignore
        control={control}
        handleClear={() => setValue('shift_id', '')}
        label="Смена"
        name="shift_id"
        options={shifts}
        value={watchAll.shift_id}
      />
      <Grid container>
        <Grid>
          <FormGroup>
            <Grid container sx={{ maxWidth: '500px' }}>
              {existingDisciplines.map((disciplineName) => (
                <Grid xs={6} key={disciplineName}>
                  <CheckboxInput
                    label={disciplineName}
                    onChange={(e) => {
                      console.log('checked', e);
                      if (e.target.checked) {
                        setValue('disciplines', [
                          ...watchAll.disciplines,
                          disciplineName,
                        ]);
                      } else {
                        setValue(
                          'disciplines',
                          watchAll.disciplines.filter(
                            (d) => d !== disciplineName
                          )
                        );
                      }
                    }}
                    checked={watchAll.disciplines.includes(disciplineName)}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </Grid>
        <Grid>
          <FormGroup>
            <Grid container sx={{ maxWidth: '500px' }}>
              {existinglimits.map((limitName) => (
                <Grid xs={4} key={limitName}>
                  <CheckboxInput
                    label={limitName}
                    onChange={(e) => {
                      console.log('checked', e);
                      if (e.target.checked) {
                        setValue('limits', [...watchAll.limits, limitName]);
                      } else {
                        setValue(
                          'limits',
                          watchAll.limits.filter((d) => d !== limitName)
                        );
                      }
                    }}
                    checked={watchAll.limits.includes(limitName)}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
      <Button variant="contained" type="submit">
        Сохранить
      </Button>
      <Button variant="outlined" color='info' type="submit" sx={{ color: 'grey.600' }} onClick={closeForm}>
        Отмена
      </Button>
    </VerticalForm>
  );
};

export default ProfileForm;
