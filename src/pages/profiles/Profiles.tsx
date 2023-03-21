import { FC, useState } from 'react';
import BasicTable from '../../components/ui/BasicTable/BasicTable';
import BasicTableHeader from '../../components/ui/BasicTable/BasicTableHeader';
import {
  Box,
  CircularProgress,
  Dialog,
  IconButton,
  Link,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { Link as BrowserLink } from 'react-router-dom';
import { getRoute } from '../../helpers/common';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddNewButton from '../../components/ui/AddNewButton';
import { profileFormProps, ProfileInForm } from '../../types/profiles';
import { emptyProfile } from '../../constants/empties';
import { pick } from 'lodash';
import { useAppSelector } from '../../hooks/redux';
import ProfileForm from './ProfileForm';
import { useGetProfilesQuery } from '../../api/profilesApiSlice';
import ProfileFilters from './ProfileFilters';

const Profiles: FC = () => {
  const profilesFilters = useAppSelector((state) => state.filters.profiles);
  const { data: profiles = [], isLoading } = useGetProfilesQuery(
    profilesFilters
  );
  const [editedProfile, setEditedProfile] = useState<ProfileInForm | null>(
    null
  );

  return (
    <>
      <ProfileFilters />
      <BasicTable>
        <BasicTableHeader>
          <TableRow>
            <TableCell sx={{ padding: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {isLoading && <CircularProgress size={20} />}
              </Box>
            </TableCell>
            <TableCell>Имя профиля</TableCell>
            <TableCell>Сеть</TableCell>
            <TableCell>Дисциплины</TableCell>
            <TableCell>Лимиты</TableCell>
            <TableCell>Аккаунт</TableCell>
            <TableCell />
          </TableRow>
        </BasicTableHeader>

        <TableBody>
          {profiles.map((profile, index) => (
            <TableRow key={profile.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{profile.name}</TableCell>
              <TableCell>{profile.contract.network.name}</TableCell>
              <TableCell>{profile.disciplines.join(', ')}</TableCell>
              <TableCell>{profile.limits.join(', ')}</TableCell>
              <TableCell>
                {profile.accounts.map((account) => (
                  <Link
                    key={account.nickname}
                    component={BrowserLink}
                    to={getRoute('accounts', 'show', account.id)}
                  >
                    {account.nickname}
                  </Link>
                ))}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    setEditedProfile(
                      //@ts-ignore
                      pick(profile, profileFormProps)
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

      <AddNewButton
        onClick={() => {
          setEditedProfile(emptyProfile);
        }}
      />

      <Dialog open={!!editedProfile} onClose={() => setEditedProfile(null)}>
        {editedProfile && (
          <ProfileForm
            profile={editedProfile!}
            closeForm={() => setEditedProfile(null)}
          />
        )}
      </Dialog>
    </>
  );
};

export default Profiles;
