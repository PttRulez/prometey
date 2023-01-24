import { FC } from 'react';
import { ContractInForm } from '../../types/contracts';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import FormText from '../../components/ui/Forms/FormText';
import VerticalForm from '../../components/ui/Forms/VerticalForm';
import FormSelect from '../../components/ui/Forms/FormSelect';
import ContractService from '../../services/ContractService';
import { AxiosError } from 'axios';
import { openNotification } from '../../store/notificationSlice';
import { addContract, updateContract } from '../../store/contractsSlice';

type Props = {
  contract: ContractInForm;
  afterSuccesfulSubmit: () => void;
};

const ContractForm: FC<Props> = ({ afterSuccesfulSubmit, contract }) => {
  const { control, handleSubmit, setValue, watch } = useForm<ContractInForm>({
    defaultValues: contract,
  });
  const networksList = useAppSelector(
    (state) => state.selectLists.networksList
  );

  const dispatch = useAppDispatch();
  const watchAll = watch();

  const onSubmit: SubmitHandler<ContractInForm> = async (data) => {
    try {
      if (data.id) {
        const response = await ContractService.updateContract(data);
        dispatch(updateContract(response.data));
      } else {
        const response = await ContractService.createContract(data);
        dispatch(addContract(response.data));
      }

      dispatch(
        openNotification({ type: 'success', text: 'Контракт сохранился' })
      );
      afterSuccesfulSubmit();
    } catch (e) {
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Ошибка при сохранении контракта',
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
        options={networksList}
        value={watchAll.network_id}
      />
      <Button variant="contained" type="submit">
        Сохранить
      </Button>
    </VerticalForm>
  );
};

export default ContractForm;
