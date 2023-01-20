import { FC, useEffect, useState } from 'react';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';
import {
  Dialog,
  IconButton,
  Link,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link as RouterLink } from 'react-router-dom';
import { fetchContracts } from '../../store/contractsSlice';
import { Contract, contractPropsArr } from '../../types/contracts';
import { ModeEdit } from '@mui/icons-material';
import ContractForm from './ContractForm';
import { pick } from 'lodash';
import { fetchNetworksList } from '../../store/selectListsSlice';

const Contracts: FC = () => {
  const dispatch = useAppDispatch();
  const contracts = useAppSelector((state) => state.contracts.contracts);
  const networksList = useAppSelector(
    (state) => state.selectLists.networksList
  );
  const [editedContract, setEditedContract] = useState<Contract | null>(null);

  useEffect(() => {
    dispatch(fetchNetworksList());
    dispatch(fetchContracts());
  }, []);

  const afterSuccesfulSubmit = () => {
    setEditedContract(null);
  };
  return (
    <>
      <BasicTable>
        <BasicTableHeader>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Номер контракта</TableCell>
            <TableCell>Сеть</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </BasicTableHeader>

        <TableBody>
          {contracts.map((contract, index) => (
            <TableRow key={contract.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/contracts/${contract.id}`}
                  underline={'hover'}
                >
                  {contract.name}
                </Link>
              </TableCell>
              <TableCell>{networksList[contract.network_id]}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    setEditedContract(
                      pick(contract, contractPropsArr) as Contract
                    )
                  }
                >
                  <ModeEdit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </BasicTable>
      <Dialog open={!!editedContract} onClose={() => setEditedContract(null)}>
        {editedContract && (
          <ContractForm
            contract={editedContract!}
            afterSuccesfulSubmit={afterSuccesfulSubmit}
          />
        )}
      </Dialog>
    </>
  );
};

export default Contracts;
