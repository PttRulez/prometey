export interface SelectList {
  [key: number | string]: string;
}

export interface SelectOption {
  id: number | string;
  name: string | number;
  [key: string]: string | number;
}

export interface MuiDataGridSelectOption {
  value: number;
  label: string;
}

export interface SxProp {
  [key: string]: string | number;
}

export interface SelectListsState {
  affiliateList: SelectList;
  currenciesList: SelectList;
  monthsList: SelectList;
  networksList: SelectList;
  yearsListList: SelectList;
}

export interface SomeObject {
  [key: string]: any;
}

export type SelectedProperty = number | null | '';
