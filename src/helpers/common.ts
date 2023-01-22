import { SelectList, SelectOption, SomeObject } from '../types/common';
import routes from '../router/routes';

export const getOptionsList = (obj: SelectList): SelectOption[] => {
  return Object.entries(obj).reduce((acc, cur) => {
    acc.push({ value: Number(cur[0]), label: cur[1] });
    return acc;
  }, [] as { value: number; label: string }[]);
};

export const getSelectList = (
  arr: SomeObject[],
  fieldName: string,
  indexKey: string = 'id'
): SelectList => {
  const selectList = {} as SelectList;
  for (const obj of arr) {
    selectList[obj[indexKey]] = obj[fieldName];
  }
  return selectList;
};

export const getJsonSelectList = (
  arr: SomeObject[],
  indexKey: string = 'id'
): SelectList => {
  const selectList = {} as SelectList;
  for (const obj of arr) {
    selectList[obj[indexKey]] = JSON.stringify(obj);
  }
  return selectList;
};

type Model =
  | 'accounts'
  | 'bobIds'
  | 'networks'
  | 'contracts'
  | 'profiles'
  | 'rooms';

export const getRoute = (
  model: Model,
  type: string = 'index',
  id: number = 0
): string => {
  //@ts-ignore
  return routes[model][type].replace(':id', id);
};
