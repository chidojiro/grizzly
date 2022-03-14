import { SearchApis } from 'apis';
import React from 'react';
import useSWR from 'swr';
import { SearchAutocompleteRequestValues } from 'types';

export const useAutoComplete = (q: string) => {
  const [data, setData] = React.useState<any>();

  const values = React.useMemo<SearchAutocompleteRequestValues>(() => ({ q, resultsPerPage: '5', fields: '' }), [q]);

  const swrReturn = useSWR(['/autocomplete', q], () => {
    if (q.length < 3) return { data: {} } as any;

    return SearchApis.getSuggestions(values);
  });

  // somehow swr doesn't keep stale data
  // this is a workaround for that
  React.useEffect(() => {
    if (swrReturn.data) setData(swrReturn.data);
  }, [q, swrReturn]);

  return { ...swrReturn, data: (data?.['q.suggestions']?.split(',') as string[]) || [] };
};
