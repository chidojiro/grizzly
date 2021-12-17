import { SearchResponse } from '@sajari/sdk-js/dist/index';
import { SupportApis } from 'apis';
import React from 'react';
import useSWR from 'swr';

export const useSupport = (q: string) => {
  const [data, setData] = React.useState<SearchResponse>();

  const swrReturn = useSWR(q && ['/articles', q], () => {
    return SupportApis.get(q);
  });

  // somehow swr doesn't keep stale data
  // this is a workaround for that
  React.useEffect(() => {
    if (swrReturn.data) setData(swrReturn.data[0]);
  }, [swrReturn]);

  const returnValue = React.useMemo(
    () => ({
      ...swrReturn,
      data: data?.results
        .map(({ values: { title, url } }) => ({ title, url }))
        .filter(({ url }) => !url.includes('article_attachments')),
    }),
    [data, swrReturn]
  );

  return returnValue;
};
