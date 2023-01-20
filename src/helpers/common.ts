import { SelectList, SelectOption } from '../types/common';

export const getOptionsList = (obj: SelectList): SelectOption[] => {
  return Object.entries(obj).reduce((acc, cur) => {
    acc.push({ value: Number(cur[0]), label: cur[1] });
    return acc;
  }, [] as { value: number; label: string }[]);
};
