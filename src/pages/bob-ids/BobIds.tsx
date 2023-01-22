import { FC, useEffect, useMemo, useState } from 'react';
import { useLazyGetBobIdsQuery } from '../../api/bobIdsApiSlice';
import { useAppSelector } from '../../hooks/redux';
import BobIdFilters from './BobIdFilters';
import AdvancedTable, {
  AdvancedTableColumn,
} from '../../components/ui/AdvancedTable/AdvancedTable';
import { Dialog, IconButton } from '@mui/material';
import { BobId, bobIdPropsArr } from '../../types/bobIds';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddNewButton from '../../components/ui/AddNewButton';
import { pick } from 'lodash';
import { emptyBobId } from '../../constants/empties';
import BobIdForm from './BobIdForm';

const BobIds: FC = () => {
  const [fetchBobIds, result] = useLazyGetBobIdsQuery();
  const bobIdFilters = useAppSelector((state) => state.bobIds.filters);
  const [editedBobId, setEditedBobId] = useState<BobId | null>(null);

  useEffect(() => {
    fetchBobIds(bobIdFilters);
  }, [fetchBobIds, bobIdFilters]);

  const columns: AdvancedTableColumn[] = useMemo(() => {
    return [
      {
        name: 'bob_id',
        label: 'Боб Айди',
      },
      {
        name: 'network_id',
        label: 'Сеть',
        format: (value, row) => {
          return row.network.name;
        },
      },
      {
        name: 'disciplines',
        label: 'Дисциплины',
        format: (value: Array<string>) => {
          return value.join(' - ');
        },
      },
      {
        name: 'actions',
        label: '',
        render: (_, bobId) => {
          return (
            <IconButton
              onClick={() =>
                setEditedBobId(pick(bobId, bobIdPropsArr) as BobId)
              }
            >
              <ModeEditIcon />
            </IconButton>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      <BobIdFilters sx={{ marginBottom: '20px' }} />
      <AdvancedTable
        columns={columns}
        rows={result.data?.bobIds ?? []}
        sx={{ maxHeight: '80vh' }}
      />
      <AddNewButton
        onClick={() => setEditedBobId(emptyBobId)}
        sx={{ bottom: 5 }}
      />
      <Dialog open={!!editedBobId} onClose={() => setEditedBobId(null)}>
        {editedBobId && (
          <BobIdForm
            bobId={editedBobId!}
            afterSuccesfulSubmit={() => setEditedBobId(null)}
          />
        )}
      </Dialog>
    </>
  );
};

export default BobIds;
