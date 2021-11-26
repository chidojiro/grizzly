import { SearchApis } from 'apis';
import { count, priceBuckets } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { FilterInfo, SearchQueryRequestValues } from 'types';
import { FilterUtils } from 'utils';

export const usePriceFilterInfo = () => {
  const { page, perPage, sortBy, q } = useSearchParams();

  const [data, setData] = React.useState<FilterInfo>({
    label: 'Price',
    name: 'price',
    options: [],
  });

  const { watch } = useFormContext();
  const filters = watch('filters') as Record<string, string[]>;

  const combinedFilters = FilterUtils.combineFilters(q, filters);

  const values: SearchQueryRequestValues = React.useMemo(
    () => ({
      fields: '',
      q: FilterUtils.isSimpleQ(q) ? q : '',
      resultsPerPage: '1',
      sortBy: '',
      page: '1',
      buckets: priceBuckets,
      count,
      countFilters: combinedFilters,
      filter: '(price > 0)',
      max: '',
      min: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, combinedFilters, page, perPage, q, sortBy]
  );

  const swrReturn = useSWR(['/priceFilterInfo', JSON.stringify(values)], () => SearchApis.getPriceFilterInfo(values));

  React.useEffect(() => {
    if (swrReturn.data) {
      setData(swrReturn.data);
    }
  }, [swrReturn.data]);

  return React.useMemo(() => ({ ...swrReturn, data }), [data, swrReturn]);
};
