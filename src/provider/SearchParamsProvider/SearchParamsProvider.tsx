import { useQuery } from 'hooks';
import React from 'react';
import { Children } from 'types';

type SearchParamsProviderValue = { page: number; perPage: number; sortBy: string; q: string };

const DefaultSearchParams = { page: 1, perPage: 25, sortBy: 'relevance+desc', q: '' };

export const SearchParamsContext = React.createContext<SearchParamsProviderValue>(DefaultSearchParams);

type Props = Children;

export const SearchParamsProvider = ({ children }: Props) => {
  const query = useQuery();
  const pageQuery = query.get('p');
  const qQuery = query.get('q');
  const perPageQuery = query.get('size');
  const sortByQuery = query.get('sortBy');
  const page = pageQuery ? +pageQuery : DefaultSearchParams.page;
  const perPage = perPageQuery ? +perPageQuery : DefaultSearchParams.perPage;
  const sortBy = (sortByQuery as string) ?? DefaultSearchParams.sortBy;
  const q = (qQuery as string) ?? DefaultSearchParams.q;

  const returnValue = React.useMemo<SearchParamsProviderValue>(
    () => ({ page, sortBy, perPage, q }),
    [page, perPage, q, sortBy]
  );

  return <SearchParamsContext.Provider value={returnValue}>{children}</SearchParamsContext.Provider>;
};
