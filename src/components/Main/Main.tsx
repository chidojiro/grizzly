import { Pagination } from 'components';
import { useQuery } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Results } from './Results';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import querystring from 'querystring';

export const Main = () => {
  const query = useQuery();

  const pageQuery = query.get('p');

  const page = pageQuery ? +pageQuery : 1;
  const handlePageChange = (page: number) => {
    query.set('p', page);
  };

  const { watch, reset, setValue } = useFormContext();

  const values = watch();

  console.log(values);

  React.useEffect(() => {
    const { size, sortBy, ...restValues } = values;

    const fq = Object.keys(restValues).reduce((acc, curKey) => {
      return acc + restValues[curKey].reduce((accCurKey: string, cur: string) => accCurKey + `(${curKey}:${cur})`, '');
    }, '');

    query.set({ fq, size, sortBy });
  }, [JSON.stringify(values)]);

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

    console.log(fq, rawFilters, filters);

    Object.keys(filters).forEach(key => setValue(key, filters[key]));
  }, []);

  return (
    <div>
      <Toolbar />
      <div className='tw-flex tw-pt-3'>
        <Sidebar />
        <Results />
      </div>
      <Pagination totalRecord={100} perPage={25} onChange={handlePageChange} page={page} />
    </div>
  );
};
