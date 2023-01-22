import { ContractInForm } from '../types/contracts';
import { ProfileInForm } from '../types/profiles';
import { BobId, BobIdFilters } from '../types/bobIds';

export const emptyContract: ContractInForm = {
  id: null,
  name: '',
  network_id: null,
};

export const emptyProfile: ProfileInForm = {
  id: 0,
  contract_id: '',
  name: '',
  limits: [],
  shift_id: '',
  disciplines: [],
};

export const emptyBobIdFilters: BobIdFilters = {
  bob_id: '',
  network_id: '',
  show_deleted: false,
};

export const emptyBobId: BobId = {
  bob_id: '',
  disciplines: [],
  id: 0,
  limits: [],
  network_id: '',
  profile_id: '',
};
