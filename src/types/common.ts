export interface SelectList {
  [key: number]: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
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
