import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { statuses } from '../../constants/common';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  DarkModeTwoTone,
  WbSunnyTwoTone,
  WbTwilightTwoTone,
} from '@mui/icons-material';
import AdvancedTable, {
  AdvancedTableColumn,
} from '../../components/ui/AdvancedTable/AdvancedTable';
import { IconButton, Modal } from '@mui/material';
import { Account } from '../../types/accounts';
import AddNewButton from '../../components/ui/AddNewButton';
import { emptyAccount } from '../../constants/empties';
import AccountForm from './AccountForm';
import { omit } from 'lodash';
import { useGetAccountsQuery } from '../../api/accountApiSlice';
import ProfileForm from '../profiles/ProfileForm';
import { ProfileInForm } from '../../types/profiles';

const Accounts2 = () => {
  const [editedAccount, setEditedAccount] = useState<Account | null>(null);
  const accountsFilters = useAppSelector(
    (state) => state.accounts.accountsFilters
  );

  const [editedProfile, setEditedProfile] = useState<ProfileInForm | null>(
    null
  );

  const { data } = useGetAccountsQuery(accountsFilters);

  const columns: AdvancedTableColumn[] = useMemo(
    () => [
      { name: 'nickname', label: 'Ник' },
      {
        name: 'bob_id',
        label: 'Bob ID',
        format: (value, account) => {
          return value
            ? Number(value).toLocaleString('en').replaceAll(',', ' ')
            : '';
        },
        // render: (value, account) => {
        //   return value ? value.toLocaleString('en').replaceAll(',', ' ') : '';
        // },
      },
      {
        name: 'network_id',
        label: 'Сеть',
        format: (value, account) => {
          return account.room.network?.name ?? '';
        },
      },
      { name: 'disciplines', label: 'Дисциплины' },
      { name: 'limits', label: 'Лимиты' },
      {
        name: 'status_id',
        label: 'Статус',
        format: (value) => {
          return statuses[value];
        },
      },
      {
        name: 'shift_id',
        label: 'Смена',
        render: (value, row) => {
          switch (value) {
            case 1:
              return <WbTwilightTwoTone sx={{ color: 'error.light' }} />;
            case 2:
              return <WbSunnyTwoTone color="warning" />;
            case 3:
              return <DarkModeTwoTone sx={{ color: 'grey.A700' }} />;
            default:
              return '';
          }
        },
      },
      {
        name: 'actions',
        label: '',
        render: (_, acount) => {
          return (
            <IconButton
              onClick={() =>
                setEditedAccount(
                  omit(acount, [
                    'affiliate',
                    'brain',
                    'created_by',
                    'room',
                  ]) as Account
                )
              }
            >
              <ModeEditIcon />
            </IconButton>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <AdvancedTable
        columns={columns}
        rows={data?.models ?? []}
        sx={{ maxHeight: '80vh' }}
      />
      <AddNewButton
        onClick={() => setEditedAccount(emptyAccount)}
        sx={{ bottom: 5 }}
      />
      <Modal
        open={!!editedAccount}
        onClose={() => setEditedAccount(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
      >
        {/*{editedAccount && (*/}
        <AccountForm
          account={editedAccount!}
          afterSuccesfulSubmit={() => setEditedAccount(null)}
          hueta={{ editedProfile, setEditedProfile }}
        />
        {/*)}*/}
      </Modal>

      <Modal
        open={!!editedProfile}
        onClose={() => setEditedProfile(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
      >
        <>
          {editedProfile && (
            <ProfileForm
              closeForm={() => setEditedProfile(null)}
              profile={editedProfile}
            />
          )}
        </>
      </Modal>
    </>
  );
};

export default Accounts2;
