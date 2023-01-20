import { FC } from 'react';
import { Contract } from '../../types/contracts';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import FormText from '../../components/ui/Forms/FormText';
import VerticalForm from '../../components/ui/Forms/VerticalForm';
import FormSelect from '../../components/ui/Forms/FormSelect';
import ContractService from '../../services/ContractService';
import { AxiosError } from 'axios';
import { openNotification } from '../../store/notificationSlice';
import { updateContract } from '../../store/contractsSlice';

type Props = {
  contract: Contract;
  afterSuccesfulSubmit: () => void;
};

const ContractForm: FC<Props> = ({ afterSuccesfulSubmit, contract }) => {
  const { control, handleSubmit, setValue, watch } = useForm<Contract>({
    defaultValues: contract,
  });
  const networksList = useAppSelector(
    (state) => state.selectLists.networksList
  );

  const dispatch = useAppDispatch();
  const watchAll = watch();

  const onSubmit: SubmitHandler<Contract> = async (data) => {
    console.log('submittted contract', data);

    try {
      await ContractService.updateContract(data);

      dispatch(updateContract(data));
      dispatch(
        openNotification({ type: 'success', text: 'Контракт сохранился' })
      );
      afterSuccesfulSubmit();
    } catch (e) {
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Вы НЕ залогинились',
        })
      );
    }
  };

  return (
    <VerticalForm
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <FormText
        //@ts-ignore
        control={control}
        handleClear={() => setValue('name', '')}
        label="Название контракта"
        name="name"
        value={watchAll.name}
        variant="outlined"
      />
      <FormSelect
        // @ts-ignore
        control={control}
        // @ts-ignore
        handleClear={() => setValue('network_id', null)}
        label="Сеть"
        name="network_id"
        options={networksList}
        value={watchAll.network_id}
        varian="standart"
      />
      <Button variant="contained" type="submit">
        Сохранить
      </Button>
    </VerticalForm>
  );
};

export default ContractForm;
