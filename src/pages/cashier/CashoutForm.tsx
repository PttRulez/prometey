import { FC } from 'react';
import VerticalForm from '../../components/styled/VerticalForm';
import { useForm } from 'react-hook-form';
import { Cashout } from '../../types/cashier';
import FormText from '../../components/ui/Forms/FormText';
import { Account } from '../../types/accounts';
import { Button, Typography } from '@mui/material';
import FormDatePicker from '../../components/ui/Forms/FormDatePicker';
import {
  useCreateCashoutMutation,
  useUpdateCashoutMutation,
} from '../../api/cashoutsApiSlice';
import { useAppDispatch } from '../../hooks/redux';
import { openNotification } from '../../store/notificationSlice';
import { AxiosError } from 'axios';
import { pick } from 'lodash';

interface Props {
  account: Account;
  cashout: Cashout;
  closeForm: () => void;
  afterSuccesfulSubmit: () => void;
}

const CashoutForm: FC<Props> = ({
  account,
  cashout,
  closeForm,
  afterSuccesfulSubmit,
}) => {
  const { control, handleSubmit, setValue, watch } = useForm<Cashout>({
    defaultValues: { ...cashout, account_id: account.id },
  });
  const dispatch = useAppDispatch();
  const watchAll = watch();
  const [createCashout] = useCreateCashoutMutation();
  const [updateCashout] = useUpdateCashoutMutation();

  const onSubmit = async (formData: Cashout) => {
    const dataToSend: Cashout = pick<Cashout>(formData, [
      'id',
      'amount',
      'account_id',
      'status_id',
      'type_id',
      'ordered_date',
      'left_balance_date',
      'canceled_date',
    ]) as Cashout;

    try {
      if (dataToSend.id) {
        await updateCashout(dataToSend).unwrap();
      } else {
        await createCashout(dataToSend).unwrap();
      }

      afterSuccesfulSubmit();

      dispatch(
        openNotification({
          type: 'success',
          text: 'Кэшаут сохранился',
        })
      );
    } catch (e) {
        console.log('Error cashout saving e:', e);
      dispatch(
        openNotification({
          error: e as AxiosError,
          type: 'error',
          text: 'Траблы с кэшаутом',
        })
      );
    }
  };

  return (
    <VerticalForm component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5">Кэшаут ({account.nickname})</Typography>
      <FormText
        //@ts-ignore
        control={control}
        handleClear={() => setValue('amount', 0)}
        label="Сумма"
        name="amount"
        value={watchAll.amount}
      />
      <FormDatePicker
        //@ts-ignore
        control={control}
        name="ordered_date"
        handleClear={() => setValue('ordered_date', '')}
        label="Дата заказа кэшаута"
        value={watchAll.ordered_date}
        inputFormat="DD-MM-YYYY"
      />
      <FormDatePicker
        //@ts-ignore
        control={control}
        name="left_balance_date"
        handleClear={() => setValue('left_balance_date', '')}
        label="Дата ухода с баланса"
        value={watchAll.left_balance_date}
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

export default CashoutForm;
