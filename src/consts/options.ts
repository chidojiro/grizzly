import { Option } from 'types';

const baseSortBy =
  new URLSearchParams(window.location.search).get('baseSortBy') || (window as any).baseSearchParams?.sortBy || '';
const resolveSortByValue = (value: string) => {
  return [value, baseSortBy].filter(Boolean).join(',');
};

export const sortByOptions: Option[] = [
  { value: resolveSortByValue(''), label: 'Sort: Best Match' },
  { value: resolveSortByValue('-reviewrating'), label: 'Sort: Review Rating' },
  { value: resolveSortByValue('-popularity'), label: 'Sort: Popularity' },
  { value: resolveSortByValue('price'), label: 'Sort: Price Low to High' },
  { value: resolveSortByValue('-price'), label: 'Sort: Price High to Low' },
  { value: resolveSortByValue('vendoritemnumber,title'), label: 'Sort: Model Number' },
];

export const pageSizeOptions: Option[] = [
  { value: '25', label: '25 Items Per Page' },
  { value: '50', label: '50 Items Per Page' },
  { value: '75', label: '75 Items Per Page' },
  { value: '100', label: '100 Items Per Page' },
];
