import { FC, useEffect, useState } from 'react';
import { Account } from '../../types/accounts';
import {
  Box,
  Button,
  FormGroup,
  FormLabel,
  SelectChangeEvent,
  Skeleton,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';
import FormText from '../../components/ui/Forms/FormText';
import FormSelect from '../../components/ui/Forms/FormSelect';
import {
  useCreateAccountMutation,
  usePrepareFormDataQuery,
  useUpdateAccountMutation,
} from '../../api/accountApiSlice';
import { Room } from '../../types/rooms';
import { SelectOption } from '../../types/common';
import {
  existingDisciplines,
  existinglimits,
  shifts,
  statuses,
} from '../../constants/common';
import FormDatePicker from '../../components/ui/Forms/FormDatePicker';
import { useLazyGetProxiesListQuery } from '../../api/selectListsApiSlice';
import { Discipline, Limit } from '../../types/other';
import CheckboxInput from '../../components/ui/NonFormInputs/CheckboxInput';
import { ProfileFromServer, ProfileInForm } from '../../types/profiles';
import { useAppDispatch } from '../../hooks/redux';
import { openNotification } from '../../store/notificationSlice';
import { AxiosError } from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ProfileForm from '../profiles/ProfileForm';
import { emptyProfile } from '../../constants/empties';

interface AccountFormProps {
  account: Account;
  afterSuccesfulSubmit: () => void;
  hueta: any;
}

const AccountForm: FC<AccountFormProps> = ({
  account,
  afterSuccesfulSubmit,
  hueta,
}) => {
  const { control, handleSubmit, setValue, watch } = useForm<Account>({
    defaultValues: account,
  });
  const watchAll = watch();

  const [editedProfile, setEditedProfile] = useState<ProfileInForm | null>(
    null
  );
  const [profileList, setProfileList] = useState<SelectOption[] | []>([]);
  const [limitsToChooseFrom, setLimitsToChooseFrom] = useState<Limit[]>(
    existinglimits
  );
  const [disciplinesToChooseFrom, setDisciplinesToChooseFrom] = useState<
    Discipline[]
  >(existingDisciplines);
  const [createProfile, setCreateProfile] = useState(false);

  const dispatch = useAppDispatch();
  const { data: preparedFormData, isSuccess } = usePrepareFormDataQuery(
    account.id
  );
  const [fetchProxies, proxiesFromServer] = useLazyGetProxiesListQuery();
  const [createAccount] = useCreateAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const onSubmit = async (formData: Account) => {
    console.log('submitted Account', formData);

    try {
      if (formData.id) {
        await updateAccount(formData).unwrap();
      } else {
        await createAccount(formData).unwrap();
      }

      afterSuccesfulSubmit();
      dispatch(
        openNotification({
          type: 'success',
          text: 'Акк сохранился',
        })
      );
    } catch (e) {
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Траблы с сохранением аккаунта',
        })
      );
    }
  };

  useEffect(() => {
    if (!watchAll.room_id || !preparedFormData?.roomList) {
      setProfileList([]);
    } else {
      fetchProxies({ room_id: watchAll.room_id, account_id: watchAll.id });

      const networkId: number = preparedFormData.roomList.find(
        (room: Room) => room.id === watchAll.room_id
      )?.network.id;

      setProfileList(
        preparedFormData.profileList.filter((profile: ProfileFromServer) => {
          if (profile.contract.network_id !== networkId) return false;
          return (
            profile.accounts.filter(
              (acc) => acc.status_id <= 2 && acc.id !== watchAll.id
            ).length === 0
          );
        })
      );
    }
  }, [watchAll.room_id, preparedFormData]);

  useEffect(() => {
    if (isSuccess && watchAll.profile_id) {
      const profile: ProfileFromServer = preparedFormData?.profileList.find(
        (p: ProfileFromServer) => p.id === watchAll.profile_id
      );
      setLimitsToChooseFrom(profile?.limits || []);
      setDisciplinesToChooseFrom(profile?.disciplines || []);
    }
  }, [isSuccess]);

  const handleChangeProfile = (e: SelectChangeEvent) => {
    const chosenId = Number(e.target.value);
    const profile: ProfileFromServer = preparedFormData?.profileList.find(
      (p: ProfileFromServer) => p.id === chosenId
    );
    if (profile.shift_id) {
      setValue('shift_id', profile.shift_id);
    }
    console.log('profile', profile);
    setLimitsToChooseFrom(profile?.limits || []);
    setDisciplinesToChooseFrom(profile?.disciplines || []);
    setValue('disciplines', profile?.disciplines || []);
    setValue('limits', profile?.limits || []);
    setValue('limits_group', profile?.limits || []);
  };

  const handleClearProfile = () => {
    setValue('profile_id', '');
    setDisciplinesToChooseFrom(existingDisciplines);
    setLimitsToChooseFrom(existinglimits);
    setValue('disciplines', []);
    setValue('limits', []);
    setValue('limits_group', []);
  };

  return preparedFormData ? (
    createProfile ? (
      <ProfileForm
        closeForm={() => setCreateProfile(false)}
        profile={emptyProfile}
      />
    ) : (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ backgroundColor: 'white' }}
      >
        <Grid
          container
          // sx={{ maxWidth: '100%', minWidth: '100%' }}
          justifyContent="space-around"
          spacing={8}
          wrap="nowrap"
        >
          {/*--------------------------------------------------------------------------------*/}
          {/*-------------------------ПЕРВАЯ КОЛОНКА-----------------------------------------*/}
          {/*--------------------------------------------------------------------------------*/}
          {/*--------------------------------------------------------------------------------*/}
          <Grid xs={4}>
            <Stack spacing={5} sx={{ minWidth: '400px' }}>
              <FormText
                //@ts-ignore
                control={control}
                handleClear={() => setValue('nickname', '')}
                label="Никнейм"
                name="nickname"
                value={watchAll.nickname}
              />
              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('brain_id', '');
                }}
                label="Мозг"
                name="brain_id"
                options={preparedFormData?.brainsList ?? []}
                value={watchAll.brain_id}
              />
              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('room_id', '');
                }}
                label="Рум"
                name="room_id"
                options={preparedFormData?.roomList ?? []}
                value={watchAll.room_id}
              />

              <FormDatePicker
                //@ts-ignore
                control={control}
                name="creation_date"
                handleClear={() => setValue('creation_date', '')}
                label="Дата создания акка"
                value={watchAll.creation_date}
                onChange={(newValue) => {
                  console.log('newValue', newValue);
                  setValue('creation_date', newValue);
                }}
                inputFormat="DD-MM-YYYY"
              />

              <FormGroup sx={{ marginTop: '0px' }}>
                <FormLabel sx={{ marginLeft: '15px' }}>Лимиты</FormLabel>
                <Grid
                  container
                  sx={{
                    maxWidth: '100%',
                    paddingLeft: '18px',
                    paddingTop: '18px',
                    paddingBottom: 0,
                  }}
                  spacing={0}
                >
                  {limitsToChooseFrom.map((limitName) => (
                    <Grid key={limitName}>
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

              <FormGroup>
                <FormLabel sx={{ marginLeft: '15px' }}>Дисциплины</FormLabel>
                <Grid
                  container
                  sx={{
                    maxWidth: '100%',
                    paddingLeft: '18px',
                    paddingTop: '18px',
                    paddingBottom: 0,
                  }}
                  spacing={0}
                >
                  {disciplinesToChooseFrom.map((limitName) => (
                    <Grid key={limitName}>
                      <CheckboxInput
                        label={limitName}
                        onChange={(e) => {
                          console.log('checked', e);
                          if (e.target.checked) {
                            setValue('disciplines', [
                              ...watchAll.disciplines,
                              limitName,
                            ]);
                          } else {
                            setValue(
                              'disciplines',
                              watchAll.disciplines.filter(
                                (d) => d !== limitName
                              )
                            );
                          }
                        }}
                        checked={watchAll.disciplines.includes(limitName)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Stack>
          </Grid>

          {/*--------------------------------------------------------------------------------*/}
          {/*-------------------------ВТОРАЯ КОЛОНКА-----------------------------------------*/}
          {/*--------------------------------------------------------------------------------*/}
          {/*--------------------------------------------------------------------------------*/}
          <Grid xs={4}>
            <Stack spacing={5} sx={{ minWidth: '400px' }}>
              <FormText
                //@ts-ignore
                control={control}
                handleClear={() => setValue('bob_id', '')}
                label="Боб Айди"
                name="bob_id"
                value={watchAll.bob_id}
              />
              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('shift_id', '');
                }}
                label="Смена"
                name="shift_id"
                options={shifts}
                value={watchAll.shift_id}
              />
              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('currency_id', '');
                }}
                label="Валюта"
                name="currency_id"
                options={preparedFormData?.currencyList ?? []}
                value={watchAll.currency_id}
              />
              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('affiliate_id', '');
                }}
                label="Аффилейт"
                name="affiliate_id"
                //@ts-ignore
                options={preparedFormData?.affiliateList ?? []}
                value={watchAll.affiliate_id}
              />
              <Grid
                container
                sx={{ padding: '0px', '& .MuiGrid2-root': { padding: '0px' } }}
                alignItems="flex-end"
              >
                <Grid>
                  <AddIcon
                    sx={{
                      maxWidth: '20px',
                      maxHeight: '20px',
                      cursor: 'pointer',
                      color: 'black',
                      borderRadius: '50%',
                      border: '1px solid black',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,.1)',
                        transition: 'background-color 0.5s ease',
                      },
                    }}
                    onClick={() => setCreateProfile(true)}
                  />
                </Grid>
                <Grid
                  sx={{ flex: 1, '&.MuiGrid2-root': { paddingLeft: '15px' } }}
                >
                  <FormSelect
                    // @ts-ignore
                    control={control}
                    handleClear={handleClearProfile}
                    onChange={handleChangeProfile}
                    label="Профиль"
                    labelPropName="label"
                    name="profile_id"
                    options={profileList}
                    value={watchAll.profile_id}
                    sx={{ width: '100%', flexGrow: 1 }}
                  />
                </Grid>
              </Grid>

              <FormGroup sx={{ marginTop: '0px' }}>
                <FormLabel sx={{ marginLeft: '15px' }}>
                  Лимитная группа (расписание)
                </FormLabel>
                <Grid
                  container
                  sx={{
                    maxWidth: '100%',
                    paddingLeft: '18px',
                    paddingTop: '18px',
                    paddingBottom: 0,
                  }}
                  spacing={0}
                >
                  {limitsToChooseFrom.map((limitName) => (
                    <Grid key={limitName}>
                      <CheckboxInput
                        label={limitName}
                        onChange={(e) => {
                          console.log('checked', e);
                          if (e.target.checked) {
                            setValue('limits_group', [
                              ...watchAll.limits_group,
                              limitName,
                            ]);
                          } else {
                            setValue(
                              'limits_group',
                              watchAll.limits_group?.filter(
                                (d) => d !== limitName
                              )
                            );
                          }
                        }}
                        checked={watchAll.limits_group?.includes(limitName)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Stack>
          </Grid>

          {/*--------------------------------------------------------------------------------*/}
          {/*-------------------------ТРЕТЬЯ КОЛОНКА-----------------------------------------*/}
          {/*--------------------------------------------------------------------------------*/}
          {/*--------------------------------------------------------------------------------*/}
          <Grid xs={4}>
            <Stack spacing={5} sx={{ minWidth: '400px' }}>
              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('person_id', '');
                }}
                label="Физик"
                name="person_id"
                options={preparedFormData?.personList ?? []}
                value={watchAll.person_id}
              />
              <FormText
                //@ts-ignore
                control={control}
                handleClear={() => setValue('login', '')}
                label="Логин"
                name="login"
                value={watchAll.login}
              />
              <FormText
                //@ts-ignore
                control={control}
                handleClear={() => setValue('password', '')}
                label="Пароль"
                name="password"
                value={watchAll.password}
              />

              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('proxy_id', '');
                }}
                label="Проксик"
                name="proxy_id"
                options={proxiesFromServer.data ?? []}
                value={watchAll.proxy_id}
              />
              <FormSelect
                // @ts-ignore
                control={control}
                handleClear={() => {
                  setValue('status_id', '');
                }}
                label="Статус"
                name="status_id"
                options={statuses}
                value={watchAll.status_id}
              />
              <FormText
                //@ts-ignore
                control={control}
                handleClear={() => setValue('comment', '')}
                label="Комментарий"
                name="comment"
                value={watchAll.comment}
                multiline
              />
              <Button variant="contained" type="submit">
                Сохранить
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    )
  ) : (
    <Skeleton />
  );
};

export default AccountForm;
