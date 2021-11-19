import { Pagination } from 'components';
import { navigating } from 'consts';
import { useQuery, useScrollToTop, useSearch, useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { Results } from './Results';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { NoResults } from './NoResults';

export const Main = () => {
  const query = useQuery();
  const { page, perPage, hasSelectedAnyFilters } = useSearchParams();
  const history = useHistory();
  const { data } = useSearch();
  const {
    searchResponse: { totalResults },
  } = data ?? { searchResponse: { totalResults: 0 } };
  const { q } = useSearchParams();
  const { pathname } = useLocation();

  const handlePageChange = (page: number) => {
    query.set('p', page);
  };

  const { watch, setValue } = useFormContext();

  const values = watch();

  useScrollToTop([page]);

  React.useEffect(() => {
    const categoryPathNames = navigating.map(({ VirtualPath }) => VirtualPath);
    const { size, sortBy, filters } = values;

    if (categoryPathNames.includes(pathname) && !hasSelectedAnyFilters) {
      query.set({ size, sortBy });
      return;
    }

    if (typeof q === 'string') {
      const fq = Object.keys(filters).reduce((acc, curKey) => {
        return acc + filters[curKey].reduce((accCurKey: string, cur: string) => accCurKey + `(${curKey}:${cur})`, '');
      }, '');

      const searchParams = query.form({ fq, size, sortBy, q });

      history.push({ pathname: '/search', search: searchParams });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values)]);

  const size = query.get('size');
  const sortBy = query.get('sortBy');
  const fq = query.get('fq') as string;

  React.useEffect(() => {
    setValue('size', size || '25');
    setValue('sortBy', sortBy || 'relevance+desc');

    const rawFilters = fq ? fq.slice(1, fq.length - 1).split(')(') : [];

    const filters = rawFilters.reduce<{ [key: string]: string[] }>((acc, cur) => {
      const [key, value] = cur.split(':');

      acc[key] = (acc[key] || []).concat(value);

      return acc;
    }, {});

    setValue('filters', filters);
  }, [fq, setValue, size, sortBy]);

  if (!data) return null;

  if (!data.searchResponse.results?.length) return <NoResults q={q} />;

  return (
    <div>
      <Toolbar />
      <div className='tw-flex tw-pt-3'>
        <Sidebar />
        <Results />
      </div>
      <Pagination totalRecord={+totalResults || 0} perPage={perPage} onChange={handlePageChange} page={page} />
    </div>
  );
};
