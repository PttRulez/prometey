import { FC, Fragment, useMemo, useState } from 'react';
import { useGetProxiesQuery } from '../../api/proxiesApiSlice';
import { useAppSelector } from '../../hooks/redux';
import AdvancedTable, {
  AdvancedTableColumn,
} from '../../components/ui/AdvancedTable/AdvancedTable';
import AddNewButton from '../../components/ui/AddNewButton';
import { Proxy } from '../../types/proxies';
import { Dialog, IconButton, Typography } from '@mui/material';
import { emptyProxy } from '../../constants/empties';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { pick } from 'lodash';
import ProxyForm from './ProxyForm';
import MyLink from '../../components/ui/MyLink';
import { AccountFromServer } from '../../types/accounts';

const ProxiesIndex: FC = () => {
  const proxiesFilters = useAppSelector((state) => state.filters.proxies);
  const [proxyToEdit, setProxyToEdit] = useState<Proxy | null>(null);
  const { data: proxies } = useGetProxiesQuery(proxiesFilters);

  const columns: AdvancedTableColumn[] = useMemo(() => {
    return [
      { name: 'name', label: 'Название' },
      {
        name: 'ip_port',
        label: 'ip:port',
      },
      {
        name: 'authentication',
        label: 'Логин-пароль',
      },
      {
        name: 'history_accounts',
        label: 'Аккаунты',
        render: (accounts: AccountFromServer[]) =>
          accounts.map((account) => (
            <Typography variant="body1">
              <MyLink to={`/accounts/${account.id}`}>{account.nickname}</MyLink>{' '}
              - {account.room.network.name}
            </Typography>
          )),
      },
      {
        name: 'actions',
        label: '',
        render: (_, proxy) => (
          <IconButton
            onClick={() =>
              setProxyToEdit(
                pick(proxy, [
                  'active',
                  'authentication',
                  'id',
                  'ip_port',
                  'name',
                  'proxy_provider_id',
                ]) as Proxy
              )
            }
          >
            <ModeEditIcon />
          </IconButton>
        ),
      },
    ];
  }, []);

  return (
    <Fragment>
      <AdvancedTable columns={columns} rows={proxies ?? []} />
      <AddNewButton onClick={() => setProxyToEdit(emptyProxy)} />
      <Dialog open={!!proxyToEdit} onClose={() => setProxyToEdit(null)}>
        {proxyToEdit && (
          <ProxyForm
            proxy={proxyToEdit}
            afterSuccesfulSubmit={() => setProxyToEdit(null)}
          />
        )}
      </Dialog>
    </Fragment>
  );
};

export default ProxiesIndex;
