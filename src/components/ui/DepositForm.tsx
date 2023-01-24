import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Deposit } from '../../types/cashier';
import { Account } from '../../types/accounts';
import {
  useCreateDepositMutation,
  useUpdateDepositMutation,
} from '../../api/depositsApiSlice';
import { useAppDispatch } from '../../hooks/redux';
import { openNotification } from '../../store/notificationSlice';
import { AxiosError } from 'axios';
import VerticalForm from './Forms/VerticalForm';
import { Button, Typography } from '@mui/material';
import FormText from './Forms/FormText';
import FormDatePicker from './Forms/FormDatePicker';

interface Props {
  account: Account;
  deposit: Deposit;
  closeForm: () => void;
  afterSuccesfulSubmit: () => void;
}

const DepositForm: FC<Props> = ({
  account,
  deposit,
  closeForm,
  afterSuccesfulSubmit,
}) => {
  const { control, handleSubmit, setValue, watch } = useForm<Deposit>({
    defaultValues: { ...deposit, account_id: account.id },
  });
  const dispatch = useAppDispatch();
  const watchAll = watch();
  const [createDeposit] = useCreateDepositMutation();
  const [updateDeposit] = useUpdateDepositMutation();

  const onSubmit = async (formData: Deposit) => {
    console.log('submitted Deposit', formData);

    try {
      if (formData.id) {
        await updateDeposit(formData).unwrap();
      } else {
        await createDeposit(formData).unwrap();
      }

      afterSuccesfulSubmit();

      dispatch(
        openNotification({
          type: 'success',
          text: 'Депозит сохранился',
        })
      );
    } catch (e) {
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Траблы с депозитом',
        })
      );
    }
  };

  return (
    <VerticalForm component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5">Депозит ({account.nickname})</Typography>
      <FormText
        //@ts-ignore
        control={control}
        handleClear={() => setValue('amount', '')}
        label="Сумма"
        name="amount"
        value={watchAll.amount}
      />
      <FormDatePicker
        //@ts-ignore
        control={control}
        name="reached_balance_date"
        handleClear={() => setValue('reached_balance_date', '')}
        label="Дата"
        value={watchAll.reached_balance_date}
        inputFormat="DD-MM-YYYY"
      />
      <Button variant="contained" type="submit">
        Сохранить
      </Button>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          closeForm();
        }}
      >
        Отмена
      </Button>
    </VerticalForm>
  );
};

export default DepositForm;
