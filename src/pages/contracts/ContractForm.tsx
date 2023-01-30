import { FC } from 'react';
import { ContractInForm } from '../../types/contracts';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import FormText from '../../components/ui/Forms/FormText';
import VerticalForm from '../../components/styled/VerticalForm';
import FormSelect from '../../components/ui/Forms/FormSelect';
import { openNotification } from '../../store/notificationSlice';
import {
  useAddContractMutation,
  useUpdateContractMutation,
} from '../../api/contractsApiSlice';
import { AxiosError } from 'axios';
import { useGetNetworkListQuery } from '../../api/selectListsApiSlice';

type Props = {
  contract: ContractInForm;
  afterSuccesfulSubmit: () => void;
};

const ContractForm: FC<Props> = ({ afterSuccesfulSubmit, contract }) => {
  const { control, handleSubmit, setValue, watch } = useForm<ContractInForm>({
    defaultValues: contract,
  });
  const { data: networksList } = useGetNetworkListQuery();
  const [addContract] = useAddContractMutation();
  const [updateContract] = useUpdateContractMutation();

  const dispatch = useAppDispatch();
  const watchAll = watch();

  const onSubmit: SubmitHandler<ContractInForm> = async (data) => {
    try {
      if (data.id) {
        updateContract(data);
      } else {
        addContract(data);
      }

      dispatch(
        openNotification({
          type: 'success',
          text: 'Контракт сохранился',
        })
      );
      afterSuccesfulSubmit();
    } catch (e) {
      dispatch(
          openNotification({
            error: e as AxiosError,
            type: 'error',
            text: 'Сохранение контракта зафейлилось',
          })
        );
    }
  };

  return (
    <VerticalForm
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      sx={{ minWidth: '500px' }}
    >
      <FormText
        //@ts-ignore
        control={control}
        handleClear={() => setValue('name', '')}
        label="Название контракта"
        name="name"
        value={watchAll.name}
      />
      <FormSelect
        // @ts-ignore
        control={control}
        handleClear={() => setValue('network_id', null)}
        label="Сеть"
        name="network_id"
        options={networksList ?? []}
        value={watchAll.network_id}
      />
      <Button variant="contained" type="submit">
        Сохранить
      </Button>
    </VerticalForm>
  );
};

export default ContractForm;
