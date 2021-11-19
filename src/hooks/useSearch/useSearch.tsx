import { SearchApis } from 'apis';
import { count, filterFields, metadata, priceBuckets } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHistory } from 'react-router';
import useSWR from 'swr';
import { SearchQueryRequestPayload, FilterInfo, SearchQueryResponsePayload } from 'types';
import { combineFilters, isSimpleQ } from './utils';

export const useSearch = () => {
  const { page, perPage, sortBy, q, hasSelectedFilter } = useSearchParams();
  const [data, setData] = React.useState<SearchQueryResponsePayload>();
  const history = useHistory();

  const { watch } = useFormContext();

  const filters = watch('filters') as Record<string, string[]>;

  const combinedFilters = combineFilters(q, filters);

  const payload: SearchQueryRequestPayload = React.useMemo(
    () => ({
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
          q: isSimpleQ(q) ? q : '',
          resultsPerPage: perPage.toString(),
          sortBy: sortBy,
          page: page.toString(),
          buckets: priceBuckets,
          count,
          countFilters: combinedFilters,
          filter: '',
          max: '',
          min: '',
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, combinedFilters, page, perPage, q, sortBy]
  );

  const swrReturn = useSWR(['/search', JSON.stringify(payload)], () => SearchApis.get(payload), {
    onError: () => {
      history.push('/search');
      window.location.reload();
    },
  });

  // somehow swr doesn't keep stale data
  // this is a workaround for that
  React.useEffect(() => {
    if (swrReturn.data) setData(swrReturn.data);
  }, [swrReturn]);

  const aggregateFilters = data?.searchResponse?.aggregateFilters || {};

  const filtersInfo = Object.keys(aggregateFilters).reduce<FilterInfo[]>((acc, curField) => {
    const [type, field] = curField.split('.');

    if (type !== 'count' || !field || q.includes(field) || ['altcategory', 'categoryid'].includes(field)) return acc;

    const options = Object.keys(aggregateFilters[curField].count.counts || {})
      .filter(Boolean)
      .map(option => ({ label: option.replaceAll(' in.', '"'), value: option }))
      .filter(Boolean);

    if (!hasSelectedFilter(field) && options.length < 2) return acc;

    return [
      ...acc,
      {
        ...filterFields.find(({ name }) => name === field),
        options,
      },
    ] as FilterInfo[];
  }, []);

  const returnValue = React.useMemo(() => ({ ...swrReturn, filtersInfo, data }), [data, filtersInfo, swrReturn]);

  return returnValue;
};
