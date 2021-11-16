import { SearchApis } from 'apis';
import { metadata } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { SearchQueryRequestPayload } from 'types';

export const useSearch = () => {
  const { page, perPage, sortBy, q } = useSearchParams();

  const countQueries = ['brand', 'category1'];
  const count = countQueries.join(',');

  const { watch } = useFormContext();

  const filters = watch('filters');

  const filterQueries = countQueries.reduce<string[]>((acc, curField) => {
    const fieldFilterQueries = filters[curField]?.map((option: string) => `(${curField} = "${option}")`) || [];

    return [...acc, fieldFilterQueries.join(' OR ')];
  }, []);

  const filterQuery = filterQueries.join(',');

  const payload: SearchQueryRequestPayload = {
    metadata: metadata,
    request: {
      tracking: {
        query_id: '0kqlxq2a8jm6wq6s',
        type: 'NONE',
        sequence: 0,
        field: '_id',
        data: {
          ga: 'GA1.1.1132377212.1636510238',
          ' _ga': 'GA1.1.1132377212.1636510238',
          ' _ga_V9SMSCPSQY': 'GS1.1.1636706577.7.1.1636707843.0',
        },
      },
      pipeline: { name: 'query' },
      values: {
        fields: '',
        q,
        resultsPerPage: perPage.toString(),
        sortBy: sortBy,
        page: page.toString(),
        buckets: '',
        count: count,
        countFilters: filterQuery,
        filter: '_id != ""',
        max: '',
        min: '',
      },
    },
  };

  const swrReturn = useSWR(['/search', count, filterQuery, page, sortBy, perPage], () => SearchApis.get(payload));

  const aggregateFilters = swrReturn.data?.searchResponse?.aggregateFilters || {};

  const filtersOptions = Object.keys(aggregateFilters).reduce<{ [key: string]: string[] }>((acc, cur) => {
    const [, field] = cur.split('.');

    const options = Object.keys(aggregateFilters[cur].count.counts || {});

    return { ...acc, [field]: options };
  }, {});

  const returnValue = React.useMemo(() => ({ ...swrReturn, filtersOptions }), [filtersOptions, swrReturn]);

  return returnValue;
};
