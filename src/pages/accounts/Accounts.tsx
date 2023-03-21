import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { statuses } from '../../constants/common';
import AccountActions from './components/AccountActions';
import {
  DarkModeTwoTone,
  WbSunnyTwoTone,
  WbTwilightTwoTone,
} from '@mui/icons-material';
import { getMuiOptionsList } from '../../helpers/common';
import { Dialog, Modal } from '@mui/material';
import { Account } from '../../types/accounts';
import { omit } from 'lodash';
import AddNewButton from '../../components/ui/AddNewButton';
import {
  emptyAccount,
  emptyCashout,
  emptyDeposit,
} from '../../constants/empties';
import AccountForm from './components/AccountForm';
import { useGetAccountsQuery } from '../../api/accountApiSlice';
import { ProfileInForm } from '../../types/profiles';
import ProfileForm from '../profiles/ProfileForm';
import CashoutForm from '../cashier/CashoutForm';
import DepositForm from '../cashier/DepositForm';
import AccountsFilters from './components/AccountsFilters';
import { useGetNetworkListQuery } from '../../api/selectListsApiSlice';
import MyLink from '../../components/ui/MyLink';

const Accounts = () => {
  const accountsFilters = useAppSelector((state) => state.filters.accounts);

  const { data } = useGetAccountsQuery(accountsFilters);
  const { data: networkList } = useGetNetworkListQuery();

  const [editedAccount, setEditedAccount] = useState<Account | null>(null);
  const [accountToCashout, setAccountToCashout] = useState<Account | null>(
    null
  );
  const [accountToDeposit, setAccountToDeposit] = useState<Account | null>(
    null
  );

  const [pageSize, setPageSize] = useState(20);
  const [rowId, setRowId] = useState<number | null>(null);

  const [editedProfile, setEditedProfile] = useState<ProfileInForm | null>(
    null
  );

  //@ts-ignore
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'nickname',
        headerName: 'Ник',
        editable: true,
        flex: 1,
        renderCell: ({ row: account }) => {
          return (
            <MyLink to={`/accounts/${account.id}`}>{account.nickname}</MyLink>
          );
        },
      },
      {
        field: 'bob_id_name',
        headerName: 'Bob ID',
        valueFormatter: (params) =>
          params.value
            ? Number(params.value)?.toLocaleString('en').replaceAll(',', ' ')
            : params.value,
        flex: 1,
      },
      {
        field: 'network',
        headerName: 'Сеть',
        flex: 1,
        editable: true,
        type: 'singleSelect',
        valueOptions: networkList ?? [],
        valueGetter: (params: GridValueGetterParams) =>
          params.row.room?.network?.id,
        valueFormatter: ({ value }) => networkList?.[value],
      },
      { field: 'disciplines', headerName: 'Дисциплины' },
      { field: 'limits', headerName: 'Лимиты' },
      {
        field: 'status_id',
        headerName: 'Статус',
        flex: 1,
        editable: true,
        type: 'singleSelect',
        valueFormatter: (params) => {
          return statuses[params.value];
        },
        valueOptions: getMuiOptionsList(statuses),
      },
      {
        field: 'shift_id',
        headerName: 'Смена',
        flex: 1,
        editable: true,
        type: 'singleSelect',
        renderCell: ({ row: account }) => {
          switch (account.shift_id) {
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
        valueOptions: [
          { value: 1, label: 'утро' },
          { value: 2, label: 'день' },
          { value: 3, label: 'вечер' },
        ],
      },
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
        renderCell: (params) => (
          <>
            <AccountActions
              rowId={rowId}
              setRowId={setRowId}
              params={params}
              clickEdit={() =>
                setEditedAccount(
                  omit(params.row, [
                    'affiliate',
                    'brain',
                    'created_by',
                    'room',
                  ]) as Account
                )
              }
              clickCashout={() => setAccountToCashout(params.row)}
              clickDeposit={() => setAccountToDeposit(params.row)}
            />
          </>
        ),
      },
    ],
    [rowId, data]
  );

  // ONLY WITH PRO MAKES SENSE
  // const [filterModel, setFilterModel] = useState<GridFilterModel>({
  //   items: [
  //     // { columnField: 'shift_id', value: 1, operatorValue: 'is' },
  //     { columnField: 'network_id', value: 2, operatorValue: 'is' },
  //   ],
  //   linkOperator: GridLinkOperator.And,
  // });
  return (
    <>
      <AccountsFilters />
      <DataGrid
        autoHeight
        sx={{
          maxHeight: '80vh',
          '& .MuiDataGrid-main': { overflowY: 'auto' },
          marginTop: '20px',
        }}
        columns={columns}
        getRowId={(row) => row.id}
        //@ts-ignore
        rows={data?.models ?? []}
        rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSize={pageSize}
        onCellEditCommit={(params) => {
          setRowId(params.id as number);
        }}
        // ONLY WITH PRO MAKES SENSE
        // filterModel={filterModel}
        // onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
      <AddNewButton onClick={() => setEditedAccount(emptyAccount)} />

      <Dialog
        open={!!editedAccount}
        onClose={() => setEditedAccount(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            width: '90%',
            height: '90%',
          },
        }}
      >
        <>
          {!!editedAccount && (
            <AccountForm
              account={editedAccount!}
              afterSuccesfulSubmit={() => setEditedAccount(null)}
            />
          )}
        </>
      </Dialog>

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

      <Dialog
        open={!!accountToCashout}
        onClose={() => setAccountToCashout(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
      >
        <>
          {!!accountToCashout && (
            <CashoutForm
              account={accountToCashout as Account}
              cashout={emptyCashout}
              closeForm={() => setAccountToCashout(null)}
              afterSuccesfulSubmit={() => setAccountToCashout(null)}
            />
          )}
        </>
      </Dialog>

      <Dialog
        open={!!accountToDeposit}
        onClose={() => setAccountToDeposit(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
      >
        <>
          {!!accountToDeposit && (
            <DepositForm
              account={accountToDeposit as Account}
              deposit={emptyDeposit}
              closeForm={() => setAccountToDeposit(null)}
              afterSuccesfulSubmit={() => setAccountToDeposit(null)}
            />
          )}
        </>
      </Dialog>
    </>
  );
};

export default Accounts;
