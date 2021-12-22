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
};

export const SearchParamsContext = React.createContext<SearchParamsProviderValue>(DefaultSearchParams);

type Props = Children;

export const SearchParamsProvider = ({ children }: Props) => {
  const query = useQuery();
  const pageQuery = query.get('p');
  const q = (query.get('q') as string) || '';
  const perPageQuery = query.get('size');
  const sortByQuery = query.get('sortBy');
  const baseFilterQuery = query.get('baseFilter');
  const baseSortByQuery = query.get('baseSortBy');
  const page = pageQuery ? +pageQuery : DefaultSearchParams.page;
  const perPage = perPageQuery ? +perPageQuery : DefaultSearchParams.perPage;
  const sortBy = (sortByQuery as string) ?? DefaultSearchParams.sortBy;
  const { watch } = useFormContext();
  const baseSearchParams = (window as any).baseSearchParams;
  const luceneQueries = new URLSearchParams((window as any).luceneQueries || '');
  const filters = watch('filters');
  const hasSelectedAnyFilters = Object.values(filters).some((selected: any) => !!selected.length);

  const hasSelectedFilter = React.useCallback((field: string) => filters[field]?.length > 0, [filters]);

  const returnValue = React.useMemo<SearchParamsProviderValue>(
    () => ({
      page,
      sortBy,
      baseSortBy:
        (baseSortByQuery as string) ||
        (baseSearchParams ? baseSearchParams?.sortBy : luceneQueries.get('sortBy')) ||
        '',
      perPage,
      q,
      filters,
      hasSelectedAnyFilters,
      hasSelectedFilter,
      baseFilter:
        (baseFilterQuery as string) ||
        (baseSearchParams
          ? FilterUtils.buildFilterFromBaseFilters(baseSearchParams?.filters)
          : FilterUtils.buildFilterFromLuceneQueries(luceneQueries.get('q') || '')) ||
        '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters), page, perPage, q, sortBy, hasSelectedFilter]
  );

  return <SearchParamsContext.Provider value={returnValue}>{children}</SearchParamsContext.Provider>;
};
