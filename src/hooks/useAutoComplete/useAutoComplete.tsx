import { SearchApis } from 'apis';
import debounce from 'lodash/debounce';
import React from 'react';
import useSWR from 'swr';
import { SearchAutocompleteRequestValues } from 'types';

export const useAutoComplete = () => {
  const [q, _setQ] = React.useState('');
  const [debouncedQ, setDebouncedQ] = React.useState(q);

  const debouncedSetQ = debounce((q: string) => setDebouncedQ(q), 300);
  const setQ = React.useRef((q: string) => {
    _setQ(q);
    debouncedSetQ(q);
  });

  const values = React.useMemo<SearchAutocompleteRequestValues>(() => ({ q, resultsPerPage: '5', fields: '' }), [q]);

  const { data, ...restSwrReturn } = useSWR(
    debouncedQ && ['/autocomplete', debouncedQ],
    () => SearchApis.getSuggestions(values),
    {}
  );

  return { ...restSwrReturn, data: (data?.['q.suggestions']?.split(',') as string[]) || [], q, setQ: setQ.current };
};
