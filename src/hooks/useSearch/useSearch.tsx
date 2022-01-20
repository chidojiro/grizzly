import { SearchResponse, Tracking, TrackingType } from '@sajari/sdk-js/dist/index';
import { SearchApis } from 'apis';
import { count, defaultTracking, priceBuckets } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import { useHistory } from 'react-router';
import useSWR from 'swr';
import { SearchQueryRequestValues } from 'types';
import { FilterUtils } from 'utils';

export const useSearch = () => {
  const { page, perPage, sortBy, q, baseFilter, filters, baseSortBy } = useSearchParams();
  const [data, setData] = React.useState<SearchResponse>();
  const history = useHistory();
  const trackingRef = React.useRef<Tracking>({ ...defaultTracking, type: TrackingType.PosNeg });

  const countFilters = FilterUtils.buildCountFilters(filters);

  const values: SearchQueryRequestValues = React.useMemo(() => {
    const priceFilter = FilterUtils.resolvePriceFilterString(filters.price);
    return {
      fields: '',
      q,
      resultsPerPage: perPage.toString(),
      sort: [sortBy, baseSortBy].filter(Boolean).join(','),
      page: page.toString(),
      buckets: priceBuckets,
      count,
      countFilters,
      filter: [priceFilter, baseFilter && `(${baseFilter})`].filter(Boolean).join(' AND '),
      max: '',
      min: '',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters.price), q, perPage, sortBy, page, JSON.stringify(countFilters)]);

  const swrReturn = useSWR(
    ['/search', JSON.stringify(values)],
    () => {
      return SearchApis.get(values, trackingRef.current);
    },
    {
      // onError: () => {
      //   history.push('/search');
      //   window.location.reload();
      // },
      onSuccess: () => {
        trackingRef.current.sequence = (trackingRef.current.sequence ?? 0) + 1;
      },
    }
  );

  // somehow swr doesn't keep stale data
  // this is a workaround for that
  React.useEffect(() => {
    if (swrReturn.data) setData(swrReturn.data[0]);
  }, [swrReturn]);

  const returnValue = React.useMemo(() => ({ ...swrReturn, data }), [data, swrReturn]);

  return returnValue;
};
