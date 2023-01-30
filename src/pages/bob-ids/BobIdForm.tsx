import { FC, useEffect, useState } from 'react';
import { BobId } from '../../types/bobIds';
import VerticalForm from '../../components/styled/VerticalForm';
import FormText from '../../components/ui/Forms/FormText';
import { useForm } from 'react-hook-form';
import FormSelect from '../../components/ui/Forms/FormSelect';
import { useAppDispatch } from '../../hooks/redux';
import { Button, FormGroup, SelectChangeEvent } from '@mui/material';
import {
  useGetNetworkListQuery,
  useGetProfilesListsQuery,
} from '../../api/selectListsApiSlice';
import { SelectList } from '../../types/common';
import { Profile, ProfileFromServer } from '../../types/profiles';
import { existingDisciplines, existinglimits } from '../../constants/common';
import Grid from '@mui/material/Unstable_Grid2';
import CheckboxInput from '../../components/ui/NonFormInputs/CheckboxInput';
import { Discipline, Limit } from '../../types/other';
import { getSelectList } from '../../helpers/common';
import {
  useAddBobIdMutation,
  useUpdateBobIdMutation,
} from '../../api/bobIdsApiSlice';
import { AxiosError } from 'axios';
import { openNotification } from '../../store/notificationSlice';

type Props = {
  bobId: BobId;
  afterSuccesfulSubmit: () => void;
};

const BobIdForm: FC<Props> = ({ bobId, afterSuccesfulSubmit }) => {
  const dispatch = useAppDispatch();
  const { data: profilesLists, isLoading } = useGetProfilesListsQuery();
  const [profilesList, setProfilesList] = useState<SelectList>({});
  const [limitsToShow, setLimitsToShow] = useState<Limit[]>(existinglimits);
  const [discilinesToShow, setDiscilinesToShow] = useState<Discipline[]>(
    existingDisciplines
  );
  const [createBobId] = useAddBobIdMutation();
  const [updateBobId] = useUpdateBobIdMutation();

  const { control, handleSubmit, setValue, watch } = useForm<BobId>({
    defaultValues: bobId,
  });

  const { data: networksList } = useGetNetworkListQuery();

  const watchAll = watch();

  const onSubmit = async (data: BobId) => {
    console.log('submitted bobId', data);

    if (data.id) {
      try {
        await updateBobId(data).unwrap();
        afterSuccesfulSubmit();
      } catch (e) {
        dispatch(
          openNotification({
            type: 'success',
            text: 'Боб айди сохранился',
          })
        );
      }
    } else {
      try {
        await createBobId(data).unwrap();
        afterSuccesfulSubmit();
      } catch (e) {
        dispatch(
          openNotification({
            error: e as AxiosError,
            type: 'error',
            text: 'Траблы с бобайди',
          })
        );
      }
    }
  };

  useEffect(() => {
    if (watchAll.network_id) {
      if (profilesLists) {
        const filterdList = profilesLists[watchAll.network_id]?.filter(
          (profile: ProfileFromServer) => {
            if (!profile.bob_id) {
              return true;
            } else {
              // только те профили, к которым не привязаны боб айди с привязанным хотя бы одним
              // активным или приостановленным аккаунтом
              return (
                profile.bob_id.accounts?.filter(
                  (acc) => acc.status_id && acc.status_id <= 2
                ).length === 0
              );
            }
          }
        );
        setProfilesList(getSelectList(filterdList ?? [], 'name'));
      }
    } else {
      setProfilesList({});
    }
  }, [profilesLists, watchAll.network_id]);

  useEffect(() => {
    if (!watchAll.profile_id) {
      setLimitsToShow(existinglimits);
      setDiscilinesToShow(existingDisciplines);
    } else {
      const chosenProfile = profilesLists[watchAll.network_id].find(
        (profile: Profile) => profile.id == watchAll.profile_id
      );
      setLimitsToShow(chosenProfile.limits ?? existinglimits);
      setDiscilinesToShow(chosenProfile.disciplines ?? existingDisciplines);
    }
  }, [watchAll.profile_id]);

  const handleChangeProfile = (e: SelectChangeEvent) => {
    const chosenProfile = profilesLists[watchAll.network_id].find(
      (profile: Profile) => profile.id === Number(e.target.value)
    );
    console.log(chosenProfile);
    setValue('disciplines', chosenProfile.disciplines ?? []);
    setValue('limits', chosenProfile.limits ?? []);
  };

  return (
    <VerticalForm
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          setValue('profile_id', '');
          setValue('network_id', '');
        }}
        label="Сеть"
        name="network_id"
        options={networksList ?? []}
        value={watchAll.network_id}
      />
      {watchAll.network_id && (
        <FormSelect
          // @ts-ignore
          control={control}
          handleClear={() => setValue('profile_id', '')}
          label="Профиль"
          name="profile_id"
          onChange={handleChangeProfile}
          options={profilesList}
          value={watchAll.profile_id}
        />
      )}
      <Grid container>
        <Grid>
          <FormGroup>
            <Grid container sx={{ maxWidth: '500px' }}>
              {discilinesToShow.map((disciplineName) => (
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
              {limitsToShow.map((limitName) => (
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
    </VerticalForm>
  );
};

export default BobIdForm;
