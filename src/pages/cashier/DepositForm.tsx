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
import VerticalForm from '../../components/styled/VerticalForm';
import { Button, Typography } from '@mui/material';
import FormText from '../../components/ui/Forms/FormText';
import FormDatePicker from '../../components/ui/Forms/FormDatePicker';
import { pick } from 'lodash';

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
    const dataToSend = pick(formData, ['id', 'account_id', 'amount', 'comment', 'ordered_date', 'reached_balance_date' ]) as Deposit;

    try {
      if (dataToSend.id) {
        await updateDeposit(dataToSend).unwrap();
      } else {
        await createDeposit(dataToSend).unwrap();
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
