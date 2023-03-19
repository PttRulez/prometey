import { AccountFromServer } from './accounts';

export interface Proxy {
  active: boolean;
  authentication: string;
  id: number;
  ip_port: string;
  name: string;
  proxy_provider_id: number;
}

export interface ProxyFromServer extends Proxy {
  deleted_at: Date | null;
	history_accounts: AccountFromServer[];
  history: number[];
}

export interface ProxyFilters {
  name: string;
  show_deleted: boolean;
}
