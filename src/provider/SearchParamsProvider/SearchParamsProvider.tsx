import { sortByOptions } from 'consts';
import { useQuery } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router';
import { Children } from 'types';
import { FilterUtils } from 'utils';

type SearchParamsProviderValue = {
  page: number;
  perPage: number;
  sortBy: string;
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
  q: '',
  filters: {},
  baseFilter: '',
  hasSelectedAnyFilters: false,
  hasSelectedFilter: () => false,
};

export const SearchParamsContext = React.createContext<SearchParamsProviderValue>(DefaultSearchParams);

type Props = Children;

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
  const { pathname } = useLocation();
  const isSearchPage = pathname === '/search';

  const query = useQuery();

  const pageQuery = query.get('p') as string;
  const qQuery = (query.get('q') || '') as string;
  const perPageQuery = query.get('size') as string;
  const sortByQuery = query.get('sortBy') as string;
  const baseFilterQuery = query.get('baseFilter') as string;

  const page = pageQuery ? +pageQuery : DefaultSearchParams.page;
  const perPage = perPageQuery ? +perPageQuery : DefaultSearchParams.perPage;

  // from global variable
  const baseSearchParams = (window as any).baseSearchParams as Record<string, string> | undefined;
  const luceneQueries = React.useMemo(() => new URLSearchParams((window as any).luceneQueries || ''), []);

  const { watch } = useFormContext();
  const filters = watch('filters');
  const hasSelectedAnyFilters = Object.values(filters).some((selected: any) => !!selected.length);

  const hasSelectedFilter = React.useCallback((field: string) => filters[field]?.length > 0, [filters]);

  const resolveSortBy = React.useCallback(() => {
    if (isSearchPage) {
      return parseLuceneSortBy(sortByQuery || '');
    }

    return baseSearchParams ? baseSearchParams.sort : parseLuceneSortBy(luceneQueries.get('sortBy') || '');
  }, [baseSearchParams, isSearchPage, luceneQueries, sortByQuery]);

  const resolveQ = React.useCallback(() => {
    if (isSearchPage) {
      return FilterUtils.buildFilterFromLuceneQueries(qQuery).q;
    }

    return baseSearchParams
      ? baseSearchParams.q
      : FilterUtils.buildFilterFromLuceneQueries(luceneQueries.get('q') || '').q || '';
  }, [baseSearchParams, isSearchPage, luceneQueries, qQuery]);

  const resolveBaseFilter = React.useCallback(() => {
    if (isSearchPage) {
      return baseFilterQuery || FilterUtils.buildFilterFromLuceneQueries(qQuery).filter;
    }

    return baseSearchParams
      ? baseSearchParams.filter
      : FilterUtils.buildFilterFromLuceneQueries(luceneQueries.get('q') || '').filter || '';
  }, [baseFilterQuery, baseSearchParams, isSearchPage, luceneQueries, qQuery]);

  const returnValue = React.useMemo<SearchParamsProviderValue>(
    () => ({
      page,
      sortBy: resolveSortBy(),
      perPage,
      filters,
      hasSelectedAnyFilters,
      hasSelectedFilter,
      q: resolveQ(),
      baseFilter: resolveBaseFilter(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters), page, perPage, hasSelectedFilter, resolveQ, resolveBaseFilter, resolveSortBy]
  );

  return <SearchParamsContext.Provider value={returnValue}>{children}</SearchParamsContext.Provider>;
};
