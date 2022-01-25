import { SearchApis } from 'apis';
import { count, priceBuckets } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import useSWR from 'swr';
import { FilterInfo, SearchQueryRequestValues } from 'types';
import { FilterUtils } from 'utils';

export const usePriceFilterInfo = () => {
  const { page, perPage, sortBy, q, baseFilter, filters } = useSearchParams();

  const [data, setData] = React.useState<FilterInfo>({
    label: 'Price',
    name: 'price',
    options: [],
  });

  const countFilters = FilterUtils.buildCountFilters(filters);

  const values: SearchQueryRequestValues = React.useMemo(
    () => ({
      fields: '',
      q,
      resultsPerPage: '1',
      sortBy: '',
      page: '1',
      buckets: priceBuckets,
      count,
      countFilters,
      filter: [baseFilter && `(${baseFilter})`, '(price > 0)'].filter(Boolean).join(' AND '),
      max: '',
      min: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, countFilters, page, perPage, q, sortBy]
  );

  const swrReturn = useSWR(['/priceFilterInfo', JSON.stringify(values)], () => SearchApis.getPriceFilterInfo(values));

  React.useEffect(() => {
    if (swrReturn.data) {
      setData(swrReturn.data);
    }
  }, [swrReturn.data]);

  return React.useMemo(() => ({ ...swrReturn, data }), [data, swrReturn]);
};
