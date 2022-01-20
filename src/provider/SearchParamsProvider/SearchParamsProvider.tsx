import { sortByOptions } from 'consts';
import { useQuery } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Children } from 'types';
import { FilterUtils } from 'utils';

type SearchParamsProviderValue = {
  page: number;
  perPage: number;
  sortBy: string;
  baseSortBy: string;
  q: string;
  filters: Record<string, string[]>;
  baseFilter: string;
  hasSelectedAnyFilters: boolean;
  hasSelectedFilter: (field: string) => boolean;
  displayQ: string;
};

const DefaultSearchParams: SearchParamsProviderValue = {
  page: 1,
  perPage: 25,
  sortBy: sortByOptions[0].value,
  baseSortBy: '',
  q: '',
  filters: {},
  baseFilter: '',
  hasSelectedAnyFilters: false,
  hasSelectedFilter: () => false,
  displayQ: '',
};

export const SearchParamsContext = React.createContext<SearchParamsProviderValue>(DefaultSearchParams);

type Props = Children;

const isSimpleQ = (q: string) => {
  return [' OR ', ' AND ', ':', '(', ')'].every(keyword => !q.includes(keyword));
};

const parseLuceneSortBy = (sortBy: string) => {
  return (
    sortBy
      .split(',')
      .map(lucSortBy => {
        const [sb, order] = lucSortBy.split(' ');

        if (order === 'desc') return `-${sb}`;

        return sb;
      })
      .filter(Boolean)
      .join(',') || ''
  );
};

export const SearchParamsProvider = ({ children }: Props) => {
  const query = useQuery();
  const pageQuery = query.get('p');
  const qQuery = (query.get('q') || '') as string;
  const perPageQuery = query.get('size');
  const sortByQuery = query.get('sortBy');
  const baseFilterQuery = query.get('baseFilter');
  const baseSortByQuery = query.get('baseSortBy');
  const page = pageQuery ? +pageQuery : DefaultSearchParams.page;
  const perPage = perPageQuery ? +perPageQuery : DefaultSearchParams.perPage;
  const sortBy = (sortByQuery as string) ?? DefaultSearchParams.sortBy;
  const { watch } = useFormContext();
  const baseSearchParams = (window as any).baseSearchParams;
  const q = qQuery && isSimpleQ(qQuery) ? qQuery : baseSearchParams?.q || '';
  const luceneQueries = new URLSearchParams((window as any).luceneQueries || '');
  const luceneQ = !isSimpleQ(qQuery) && qQuery ? luceneQueries.get('q') || '' : '';
  const filters = watch('filters');
  const hasSelectedAnyFilters = Object.values(filters).some((selected: any) => !!selected.length);
  const baseFilter =
    (baseFilterQuery as string) ||
    (baseSearchParams ? baseSearchParams.filter : FilterUtils.buildFilterFromLuceneQueries(luceneQ)) ||
    '';
  const displayQ = [q ? `q=${q}` : '', baseFilter ? `baseFilter=${baseFilter}` : ''].filter(Boolean).join(' AND ');
  const baseSortBy =
    (baseSortByQuery as string) ||
    (baseSearchParams ? baseSearchParams?.sort : parseLuceneSortBy(luceneQueries.get('sortBy') || '')) ||
    '';

  console.log(luceneQ);

  const hasSelectedFilter = React.useCallback((field: string) => filters[field]?.length > 0, [filters]);

  const returnValue = React.useMemo<SearchParamsProviderValue>(
    () => ({
      page,
      sortBy,
      baseSortBy,
      perPage,
      q,
      filters,
      hasSelectedAnyFilters,
      hasSelectedFilter,
      baseFilter,
      displayQ,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters), page, perPage, q, sortBy, hasSelectedFilter, displayQ]
  );

  return <SearchParamsContext.Provider value={returnValue}>{children}</SearchParamsContext.Provider>;
};
