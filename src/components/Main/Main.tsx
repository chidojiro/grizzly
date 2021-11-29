import { Pagination } from 'components';
import { navigating, sortByOptions } from 'consts';
import { useQuery, useScrollToTop, useSearch, useSearchParams, useUpdateEffect } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { Results } from './Results';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { NoResults } from './NoResults';
import tw from 'twin.macro';
import { isEqual } from 'lodash';

export const Main = () => {
  const query = useQuery();
  const { page, perPage, hasSelectedAnyFilters } = useSearchParams();
  const history = useHistory();
  const { data } = useSearch();
  const { totalResults } = data ?? { searchResponse: { totalResults: 0 } };
  const { q } = useSearchParams();
  const { pathname } = useLocation();
  const { watch, setValue, getValues } = useFormContext();

  const handlePageChange = (page: number) => {
    query.set('p', page);
  };

  const values = watch();
  const { size, sortBy, filters } = values;

  useScrollToTop([page, JSON.stringify(values)]);

  useUpdateEffect(() => {
    if (!q) return;

    const categoryPathNames = navigating.map(({ VirtualPath }) => VirtualPath);

    if (categoryPathNames.includes(pathname) && !hasSelectedAnyFilters) {
      query.set({ size, sortBy });
      return;
    }

    if (typeof q === 'string') {
      const filters = getValues('filters');
      const fq = Object.keys(filters).reduce((acc, curKey) => {
        return (
          acc + filters[curKey].reduce((accCurKey: string, cur: string) => accCurKey + `(${curKey}:"${cur}"")`, '')
        );
      }, '');

      const searchParams = query.form({ fq, size, sortBy, q });

      history.push({ pathname: '/search', search: searchParams });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values)]);

  const sizeQuery = query.get('size');
  const sortByQuery = query.get('sortBy');
  const fq = query.get('fq') as string;

  React.useEffect(() => {
    setValue('size', sizeQuery || '25');
    setValue('sortBy', sortByQuery || sortByOptions[0].value);

    const rawFilters = fq ? fq.split(')(').map(v => v.replaceAll(/["()]/g, '')) : [];

    const filtersFromFq = rawFilters.reduce<{ [key: string]: string[] }>((acc, cur) => {
      const [key, value] = cur.split(':');

      acc[key] = (acc[key] || []).concat(value);

      return acc;
    }, {});

    if (!isEqual(filtersFromFq, filters)) {
      setValue('filters', filtersFromFq);
    }
  }, [filters, fq, setValue, sizeQuery, sortByQuery]);

  if (!data) return null;

  if (!data.results?.length) return <NoResults q={q} />;

  return (
    <div>
      <Toolbar />
      <div css={[tw`flex pt-3`]}>
        <Sidebar />
        <Results />
      </div>
      <Pagination totalRecord={totalResults || 0} perPage={perPage} onChange={handlePageChange} page={page} />
    </div>
  );
};
