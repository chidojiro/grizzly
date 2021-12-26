import { Option } from 'types';

export const sortByOptions: Option[] = [
  { value: '', label: 'Sort: Best Match' },
  { value: '-reviewrating', label: 'Sort: Review Rating' },
  { value: '-popularity', label: 'Sort: Popularity' },
  { value: 'price', label: 'Sort: Price Low to High' },
  { value: '-price', label: 'Sort: Price High to Low' },
  { value: 'vendoritemnumber,title', label: 'Sort: Model Number' },
];

export const pageSizeOptions: Option[] = [
  { value: '25', label: '25 Items Per Page' },
  { value: '50', label: '50 Items Per Page' },
  { value: '75', label: '75 Items Per Page' },
  { value: '100', label: '100 Items Per Page' },
];
