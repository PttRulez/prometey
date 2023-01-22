import { FC, useEffect, useState } from 'react';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';
import {
  Dialog,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchContracts } from '../../store/contractsSlice';
import { ContractInForm, contractPropsArr } from '../../types/contracts';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ContractForm from './ContractForm';
import { pick } from 'lodash';
import AddNewButton from '../../components/ui/AddNewButton';
import { emptyContract } from '../../constants/empties';

const Contracts: FC = () => {
  const dispatch = useAppDispatch();
  const contracts = useAppSelector((state) => state.contracts.contracts);
  const networksList = useAppSelector(
    (state) => state.selectLists.networksList
  );
  const [editedContract, setEditedContract] = useState<ContractInForm | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);

  return (
    <>
      <BasicTable>
        <BasicTableHeader>
          <TableRow>
            <TableCell />
            <TableCell>Номер контракта</TableCell>
            <TableCell>Сеть</TableCell>
            <TableCell />
          </TableRow>
        </BasicTableHeader>

        <TableBody>
          {contracts.map((contract, index) => (
            <TableRow key={contract.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{contract.name}</TableCell>
              <TableCell>{networksList[contract.network_id!]}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    setEditedContract(
                      pick(contract, contractPropsArr) as ContractInForm
                    )
                  }
                >
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>
      <AddNewButton onClick={() => setEditedContract(emptyContract)} />
      <Dialog open={!!editedContract} onClose={() => setEditedContract(null)}>
        {editedContract && (
          <ContractForm
            contract={editedContract!}
            afterSuccesfulSubmit={() => setEditedContract(null)}
          />
        )}
      </Dialog>
    </>
  );
};

export default Contracts;
