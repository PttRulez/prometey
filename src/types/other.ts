export type Discipline =
  | 'NL HU'
  | 'NL 6max'
  | 'NL 10max'
  | 'NLS 6max'
  | 'NL6+ 6max'
  | 'NLR'
  | 'PLO HU'
  | 'PLO 6max'
  | 'PLO 10max'
  | 'PLOR'
  | 'PLO5C';

export type Limit = typeof limits[number];

const limits = [
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
