import { Pagination } from 'components';
import { sortByOptions } from 'consts';
import { useScrollToTop, useSearch, useSearchParams } from 'hooks';
import { isEqual } from 'lodash';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import tw from 'twin.macro';
import URI from 'urijs';
import { NoResults } from './NoResults';
import { Results } from './Results';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

export const Main = () => {
  const { pathname, search } = useLocation();
  const { page, perPage, baseFilter, sortBy: sortByQuery } = useSearchParams();
  const history = useHistory();
  const { data } = useSearch();
  const { totalResults } = data ?? { searchResponse: { totalResults: 0 } };
  const { q } = useSearchParams();
  const { watch, setValue } = useFormContext();
  const {
    formState: { isDirty },
  } = useFormContext();

  const uri = React.useMemo(() => {
    return new URI(search);
  }, [search]);

  const handlePageChange = (page: number) => {
    uri.setSearch('p', page);
    history.push(uri.href().toString());
  };

  const values = watch();
  const { size, sortBy, filters } = values;

  useScrollToTop([page, JSON.stringify(values)]);

  const queryParams = uri.search(true) as Record<string, string>;
  const { size: sizeQuery, fq } = queryParams;

  const syncFiltersToUrl = React.useCallback(() => {
    if (!isDirty) return;
    const fq = Object.keys(filters).reduce((acc, curKey) => {
      return acc + filters[curKey].reduce((accCurKey: string, cur: string) => accCurKey + `(${curKey}:"${cur}"")`, '');
    }, '');

    uri.setSearch({
      fq: fq || undefined,
      size: size !== '25' ? size : undefined,
      sortBy: sortBy || undefined,
      q: q || undefined,
      baseFilter: baseFilter || undefined,
      p: undefined,
    });

    if (uri.href().toString() !== search) {
      history.push({ pathname: '/search', search: uri.href().toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseFilter, JSON.stringify(filters), history, isDirty, q, size, sortBy]);

  const syncUrlToFilters = React.useCallback(() => {
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

  React.useEffect(() => {
    syncUrlToFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  React.useEffect(() => {
    syncFiltersToUrl();
  }, [syncFiltersToUrl]);

  if (!data) return null;

  if (!data.results?.length) return <NoResults q={q} />;

  return (
    <div>
      <Toolbar />
      <div css={[tw`flex pt-3`]}>
        <Sidebar />
        <div>
          <Results />
          <Pagination totalRecord={totalResults || 0} perPage={perPage} onChange={handlePageChange} page={page} />
        </div>
      </div>
    </div>
  );
};
