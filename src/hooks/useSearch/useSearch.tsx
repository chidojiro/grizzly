import { SearchApis } from 'apis';
import { count, metadata, priceBuckets, defaultTracking } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHistory } from 'react-router';
import useSWR from 'swr';
import { SearchQueryRequestPayload, SearchQueryResponsePayload } from 'types';
import { FilterUtils } from 'utils';

export const useSearch = () => {
  const { page, perPage, sortBy, q } = useSearchParams();
  const [data, setData] = React.useState<SearchQueryResponsePayload>();
  const { watch } = useFormContext();
  const history = useHistory();
  const trackingRef = React.useRef({ ...defaultTracking, type: 'POS_NEG' });

  const filters = watch('filters') as Record<string, string[]>;

  const combinedFilters = FilterUtils.combineFilters(q, filters);

  const baseRequest: SearchQueryRequestPayload['request'] = React.useMemo(() => {
    const priceFilter = FilterUtils.resolvePriceFilterString(filters.price);

    return {
      pipeline: { name: 'query' },
      values: {
        fields: '',
        q: FilterUtils.isSimpleQ(q) ? q : '',
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters.price), q, perPage, sortBy, page, JSON.stringify(combinedFilters)]);

  const swrReturn = useSWR(
    q && ['/search', JSON.stringify(baseRequest)],
    () => {
      const payload = {
        metadata,
        request: {
          ...baseRequest,
          tracking: trackingRef.current,
        },
      };

      return SearchApis.get(payload);
    },
    {
      onError: () => {
        history.push('/search');
        window.location.reload();
      },
      onSuccess: () => {
        trackingRef.current.sequence = trackingRef.current.sequence + 1;
      },
    }
  );

  // somehow swr doesn't keep stale data
  // this is a workaround for that
  React.useEffect(() => {
    if (swrReturn.data) setData(swrReturn.data);
  }, [swrReturn]);

  const returnValue = React.useMemo(() => ({ ...swrReturn, data }), [data, swrReturn]);

  return returnValue;
};
