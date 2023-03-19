import { FC, Fragment, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Box, Dialog } from '@mui/material';
import Network from './components/Network';
import TimetableFilters from './components/TimetableFilters';
import { useGetTimetableQuery } from '../../api/accountApiSlice';
import AddNewButton from '../../components/ui/AddNewButton';
import { emptyAccount } from '../../constants/empties';
import { Account } from '../../types/accounts';
import AccountForm from '../accounts/components/AccountForm';

const TimeTable: FC = () => {
  const timeTableFilters = useAppSelector((state) => state.filters.timetable);
  const { data: models } = useGetTimetableQuery(timeTableFilters);
  const [editedAccount, setEditedAccount] = useState<Account | null>(null);
  return (
    <Fragment>
      <Box sx={{ margin: 'auto' }}>
        <TimetableFilters />
        {models &&
          Object.keys(models).map((networkName) => (
            <Network
              key={networkName}
              networkName={networkName}
              disciplines={models[networkName]}
            />
          ))}
      </Box>

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
    </Fragment>
  );
};

export default TimeTable;
