import { SelectList, SelectOption } from '../types/common';
import { Discipline, Limit } from '../types/other';

export const NotificationStatus = {
  success: 'success',
  error: 'error',
};

export const shifts: SelectOption[] = [
  { name: 'Утро', id: 1 },
  { name: 'День', id: 2 },
  { name: 'Вечер', id: 3 },
];

export const notificationText = {
  success: 'Э-ге-ГЕЙ !',
  error: 'Ошибочка :(',
};

export const statuses: SelectList = {
  1: 'Активен',
  2: 'Приостановлен',
  3: 'БАН',
  4: 'Выведен из игры',
};

export const existinglimits: Limit[] = [
  '2',
  '4',
  '10',
  '20',
  '25',
  '30',
  '40',
  '50',
  '70',
  '100',
  '150',
  '200',
  '250',
  '300',
  '400',
  '500',
  '600',
  '1000',
  '2000',
  '3000',
  '4000',
  '5000',
  '10000',
  '15000',
  '20000',
];

export const existingDisciplines: Discipline[] = [
  'NL HU',
  'NL 6max',
  'NL 10max',
  'NLS 6max',
  'NL6+ 6max',
  'NLR',
  'PLO HU',
  'PLO 6max',
  'PLO 10max',
  'PLOR',
  'PLO5C',
];

export const cashoutStatusesList = {
  1: 'В ожидании',
  2: 'Завершён успешно',
  3: 'Отменён'
}

export const cashoutStatuses = {
  pending: 1,
  succesful: 2,
  canceled: 3
}

export const monthList = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь',
}
