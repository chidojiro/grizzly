import { Pagination } from 'components';
import { useQuery, useSearch, useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Results } from './Results';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

export const Main = () => {
  const query = useQuery();
  const pageQuery = query.get('p');
  const perPageQuery = query.get('size');
  const page = pageQuery ? +pageQuery : 1;
  const perPage = perPageQuery ? +perPageQuery : 25;

  const { data, isValidating } = useSearch();
  const {
    searchResponse: { totalResults },
  } = data ?? { searchResponse: { totalResults: 0 } };

  const { q } = useSearchParams();

  const handlePageChange = (page: number) => {
    query.set('p', page);
  };

  const { watch, setValue } = useFormContext();

  const values = watch();

  React.useEffect(() => {
    const { size, sortBy, filters } = values;

    const fq = Object.keys(filters).reduce((acc, curKey) => {
      return acc + filters[curKey].reduce((accCurKey: string, cur: string) => accCurKey + `(${curKey}:${cur})`, '');
    }, '');

    query.set({ fq, size, sortBy });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(values)]);

  React.useEffect(() => {
    const size = query.get('size');
    const sortBy = query.get('sortBy');
    const fq = query.get('fq') as string;

    setValue('size', size || '25');
    setValue('sortBy', sortBy || 'relevance+desc');

    const rawFilters = fq ? fq.slice(1, fq.length - 1).split(')(') : [];

    const filters = rawFilters.reduce<{ [key: string]: string[] }>((acc, cur) => {
      const [key, value] = cur.split(':');

      acc[key] = (acc[key] || []).concat(value);

      return acc;
    }, {});

    Object.keys(filters).forEach(key => setValue(`filters.${key}`, filters[key]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data && isValidating) return null;

  if (!data?.searchResponse.results?.length && !isValidating)
    return (
      <div className='tw-font-medium tw-text-[21px] tw-text-center tw-text-gray-light-1 mt-3'>
        We're sorry, we couldn't find any results for {q}
      </div>
    );

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
