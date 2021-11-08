import React from 'react';
import useSwr, { SWRConfiguration } from 'swr';

export const useSwrWithTrigger = (
  key: string | any[],
  callback: (...args: any[]) => any,
  options?: SWRConfiguration
) => {
  const [params, setParams] = React.useState<any[] | null>(null);

  const trigger = React.useCallback((...params) => {
    setParams(params);
  }, []);

  // eslint-disable-next-line standard/no-callback-literal
  const swrReturn = useSwr(params && [key, params], () => callback(...(params as any[])), options);

  return React.useMemo(() => ({ ...swrReturn, trigger }), [swrReturn, trigger]);
};
