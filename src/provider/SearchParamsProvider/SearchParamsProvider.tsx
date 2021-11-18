import { useQuery } from 'hooks';
import React from 'react';
import { Children } from 'types';

import { navigating } from 'consts';
import groupBy from 'lodash/groupBy';
import { useLocation } from 'react-router';
import { useFormContext } from 'react-hook-form';
const navigatingGroupedByVirtualPath = groupBy(navigating, 'VirtualPath');

type SearchParamsProviderValue = {
  page: number;
  perPage: number;
  sortBy: string;
  q: string;
  filters: { [key: string]: string };
  hasSelectedAnyFilters: boolean;
  hasSelectedFilter: (field: string) => boolean;
};

const DefaultSearchParams: SearchParamsProviderValue = {
  page: 1,
  perPage: 25,
  sortBy: 'relevance+desc',
  q: '',
  filters: {},
  hasSelectedAnyFilters: false,
  hasSelectedFilter: () => false,
};

export const SearchParamsContext = React.createContext<SearchParamsProviderValue>(DefaultSearchParams);

type Props = Children;

export const SearchParamsProvider = ({ children }: Props) => {
  const { pathname } = useLocation();
  const foundNavigating = navigatingGroupedByVirtualPath[pathname]?.[0];

  const query = useQuery();
  const pageQuery = query.get('p');
  const qQuery = query.get('q');
  const perPageQuery = query.get('size');
  const sortByQuery = query.get('sortBy');
  const page = pageQuery ? +pageQuery : DefaultSearchParams.page;
  const perPage = perPageQuery ? +perPageQuery : DefaultSearchParams.perPage;
  const sortBy = (sortByQuery as string) ?? DefaultSearchParams.sortBy;
  const q =
    (qQuery as string) ??
    (foundNavigating?.Query.split('&')?.[0]?.slice(2).replaceAll('((', '(').replaceAll('))', ')') ||
      DefaultSearchParams.q);
  const { watch } = useFormContext();
  const filters = watch('filters');
  const hasSelectedAnyFilters = Object.values(filters).some((selected: any) => !!selected.length);

  const hasSelectedFilter = React.useCallback((field: string) => filters[field]?.length > 0, [filters]);

  const returnValue = React.useMemo<SearchParamsProviderValue>(
    () => ({ page, sortBy, perPage, q, filters, hasSelectedAnyFilters, hasSelectedFilter }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(filters), page, perPage, q, sortBy, hasSelectedFilter]
  );

  return <SearchParamsContext.Provider value={returnValue}>{children}</SearchParamsContext.Provider>;
};
