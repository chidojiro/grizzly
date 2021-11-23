import { SearchApis } from 'apis';
import { count, filterAliases, filterFields, metadata, priceBuckets, tracking } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { SearchQueryRequestPayload, FilterInfo, SearchQueryResponsePayload } from 'types';
import { combineFilters, isSimpleQ, resolvePriceFilterString } from './utils';

export const useSearch = () => {
  const { page, perPage, sortBy, q, hasSelectedFilter } = useSearchParams();
  const [data, setData] = React.useState<SearchQueryResponsePayload>();
  const [priceFilterInfo, setPriceFilterInfo] = React.useState<FilterInfo>({
    label: 'Price',
    name: 'price',
    options: [],
  });

  const { watch } = useFormContext();

  const filters = watch('filters') as Record<string, string[]>;

  const combinedFilters = combineFilters(q, filters);

  const priceFilter = resolvePriceFilterString(filters.price);

  const payload: SearchQueryRequestPayload = React.useMemo(
    () => ({
      metadata,
      request: {
        tracking,
        pipeline: { name: 'query' },
        values: {
          fields: '',
          q: isSimpleQ(q) ? q : '',
          resultsPerPage: perPage.toString(),
          sort: sortBy,
          page: page.toString(),
          buckets: priceBuckets,
          count,
          countFilters: combinedFilters,
          filter: priceFilter,
          max: '',
          min: '',
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, combinedFilters, page, perPage, q, sortBy, priceFilter]
  );

  const swrReturn = useSWR(q && ['/search', JSON.stringify(payload)], () => SearchApis.get(payload), {
    // onError: () => {
    //   history.push('/search');
    //   window.location.reload();
    // },
  });

  const getPriceFilterInfoPayload: SearchQueryRequestPayload = React.useMemo(
    () => ({
      metadata,
      request: {
        tracking,
        pipeline: { name: 'query' },
        values: {
          fields: '',
          q: isSimpleQ(q) ? q : '',
          resultsPerPage: '1',
          sortBy: '',
          page: '1',
          buckets: priceBuckets,
          count,
          countFilters: combinedFilters,
          filter: '(price > 0)',
          max: '',
          min: '',
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, combinedFilters, page, perPage, q, sortBy, priceFilter]
  );
  const { data: priceFilterInfoData } = useSWR(['/priceFilterInfo', JSON.stringify(getPriceFilterInfoPayload)], () =>
    SearchApis.getPriceFilterInfo(getPriceFilterInfoPayload)
  );

  React.useEffect(() => {
    if (priceFilterInfoData) {
      setPriceFilterInfo(priceFilterInfoData);
    }
  }, [priceFilterInfoData]);

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

    const foundFilterField = filterFields.find(({ name }) => name === field);
    const fieldAlias = filterAliases[foundFilterField?.name || ''];

    return [
      ...acc,
      {
        ...foundFilterField,
        name: fieldAlias || foundFilterField?.name,
        options,
      },
    ] as FilterInfo[];
  }, []);

  const sortedFiltersInfo = React.useMemo(
    () => filtersInfo.sort((a, b) => ('' + a.name).localeCompare(b.name)),
    [filtersInfo]
  );

  const returnValue = React.useMemo(
    () => ({ ...swrReturn, filtersInfo: [priceFilterInfo, ...sortedFiltersInfo], data }),
    [data, sortedFiltersInfo, priceFilterInfo, swrReturn]
  );

  return returnValue;
};
