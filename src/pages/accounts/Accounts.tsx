import { useEffect, useMemo, useState } from 'react';
import { fetchAccounts } from '../../store/accountsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { statuses } from '../../constants/common';
import AccountActions from './AccountActions';
import {
  DarkModeTwoTone,
  WbSunnyTwoTone,
  WbTwilightTwoTone,
} from '@mui/icons-material';
import { getOptionsList } from '../../helpers/common';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { models: accounts, networkList } = useAppSelector(
    (state) => state.accounts.accountsPage
  );

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState<number | null>(null);

  const networks = useMemo(() => {
    return getOptionsList(networkList);
  }, [networkList]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'nickname', headerName: 'Ник', flex: 1, editable: true },
      {
        field: 'bob_id',
        headerName: 'Bob ID',
        // valueGetter: (params: GridValueGetterParams) =>
        //   params.row.bob_id?.bob_id?.toLocaleString('en').replaceAll(',', ' '),
        valueGetter: (params: GridValueGetterParams) =>
          params.row.bob_id?.bob_id,
        valueFormatter: (params) => {
          return params.value?.toLocaleString('en').replaceAll(',', ' ');
        },

        flex: 1,
      },
      {
        field: 'network',
        headerName: 'Сеть',
        flex: 1,
        editable: true,
        type: 'singleSelect',
        valueOptions: networks,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.room?.network?.id,
        valueFormatter: ({ id: rowId, value, field, api }) => {
          const colDef = api.getColumn(field);
          if (value.value) {
            value = value.value;
          }
          const option = colDef.valueOptions.find(
            // @ts-ignore
            ({ value: optionValue }) => value === optionValue
          );
          return option.label;
        },
      },
      { field: 'disciplines', headerName: 'Дисциплины', flex: 1 },
      { field: 'limits', headerName: 'Лимиты', flex: 1 },
      {
        field: 'status_id',
        headerName: 'Статус',
        flex: 1,
        editable: true,
        type: 'singleSelect',
        valueFormatter: (params) => {
          return statuses[params.value];
        },
        valueOptions: getOptionsList(statuses),
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
        renderCell: (params) => (
          <AccountActions rowId={rowId} setRowId={setRowId} params={params} />
        ),
        flex: 1,
      },
    ],
    [rowId, networks]
  );

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  // ONLY PRO MAKES SENSE
  // const [filterModel, setFilterModel] = useState<GridFilterModel>({
  //   items: [
  //     // { columnField: 'shift_id', value: 1, operatorValue: 'is' },
  //     { columnField: 'network_id', value: 2, operatorValue: 'is' },
  //   ],
  //   linkOperator: GridLinkOperator.And,
  // });
  return (
    <>
      <DataGrid
        columns={columns}
        getRowId={(row) => row.id}
        rows={accounts}
        rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSize={pageSize}
        onCellEditCommit={(params) => {
          console.log('params', params);
          setRowId(params.id as number);
        }}
        // ONLY PRO MAKES SENSE
        // filterModel={filterModel}
        // onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
    </>
  );
};

export default Accounts;
