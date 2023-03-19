import { FC } from 'react';
import VerticalForm from '../../components/styled/VerticalForm';
import FormText from '../../components/ui/Forms/FormText';
import { useForm } from 'react-hook-form';
import { Proxy } from '../../types/proxies';
import Switch from '@mui/material/Switch';
import { Button, FormControlLabel } from '@mui/material';
import {
  useAddProxyMutation,
  useUpdateProxyMutation,
} from '../../api/proxiesApiSlice';
import { useAppDispatch } from '../../hooks/redux';
import { openNotification } from '../../store/notificationSlice';
import { AxiosError } from 'axios';

interface IProps {
  proxy: Proxy;
  afterSuccesfulSubmit: () => void;
}

const ProxyForm: FC<IProps> = ({ afterSuccesfulSubmit, proxy }) => {
		const dispatch = useAppDispatch();
		const { control, handleSubmit, setValue, watch } = useForm({ defaultValues: proxy });
		const [createProxy] = useAddProxyMutation();
		const [updateProxy] = useUpdateProxyMutation();

		const watchAll = watch();

		const onSubmit = async (data: Proxy) => {
			if (data.id) {
				try {
					await updateProxy(data).unwrap();
					dispatch(
						openNotification({
							type: 'success',
							text: 'Прокси сохранился',
						})
					);
					afterSuccesfulSubmit();
				} catch (e) {
					dispatch(
						openNotification({
							error: e as AxiosError,
            type: 'error',
            text: 'Траблы с сохранением прокси',
						})
					);
				}
    } else {
      try {
        await createProxy(data).unwrap();
				dispatch(
						openNotification({
							type: 'success',
							text: 'Прокси сохранился',
						})
					);
        afterSuccesfulSubmit();
      } catch (e) {
        dispatch(
          openNotification({
            error: e as AxiosError,
            type: 'error',
            text: 'Траблы с сохранением прокси',
          })
        );
      }
    }
		}
    return (
      <VerticalForm
				component='form'
				onSubmit={handleSubmit(onSubmit)}
			>
        <FormText
          //@ts-ignore
          control={control}
          handleClear={() => setValue('name', '')}
          name="name"
          label="Название проксика"
          value={watchAll.name}
        />
        <FormText
          //@ts-ignore
          control={control}
          handleClear={() => setValue('name', '')}
          name="ip_port"
          label="Ip : port"
          value={watchAll.ip_port}
        />
        <FormText
          //@ts-ignore
          control={control}
          handleClear={() => setValue('name', '')}
          name="authentication"
          label="Логин - пароль"
          value={watchAll.authentication}
        />
				<FormControlLabel
					control={
						<Switch
						checked={watchAll.active}
						onChange={(e) => {
							console.log('e', e)
							setValue('active', e.target.checked);
						}}
						/>
					}
					label='Активный'
				/>
				<Button variant='contained' type='submit'>
					Сохранить
				</Button>
      </VerticalForm>
    );
};

export default ProxyForm;
