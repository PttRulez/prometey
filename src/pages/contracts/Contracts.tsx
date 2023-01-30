import { FC, useState } from 'react';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';
import {
  Dialog,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { ContractInForm, contractPropsArr } from '../../types/contracts';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ContractForm from './ContractForm';
import { pick } from 'lodash';
import AddNewButton from '../../components/ui/AddNewButton';
import { emptyContract } from '../../constants/empties';
import { useGetContractsQuery } from '../../api/contractsApiSlice';
import { useGetNetworkListQuery } from '../../api/selectListsApiSlice';

const Contracts: FC = () => {
  const { data: contracts } = useGetContractsQuery();
  const { data: networksList } = useGetNetworkListQuery();
  const [editedContract, setEditedContract] = useState<ContractInForm | null>(
    null
  );

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
          {contracts &&
            contracts.map((contract, index) => (
              <TableRow key={contract.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{contract.name}</TableCell>
                <TableCell>{networksList?.[contract.network_id!]}</TableCell>
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
