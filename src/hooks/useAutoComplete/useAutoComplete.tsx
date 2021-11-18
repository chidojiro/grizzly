import { SearchApis } from 'apis';
import { metadata } from 'consts';
import debounce from 'lodash/debounce';
import React from 'react';
import useSWR from 'swr';
import { SearchAutoCompleteRequestPayload } from 'types';

export const useAutoComplete = () => {
  const [q, _setQ] = React.useState('');
  const [debouncedQ, setDebouncedQ] = React.useState(q);

  const debouncedSetQ = debounce((q: string) => setDebouncedQ(q), 300);
  const setQ = React.useRef((q: string) => {
    _setQ(q);
    debouncedSetQ(q);
  });

  const resolvePayload = (q: string): SearchAutoCompleteRequestPayload => {
    return {
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
        pipeline: { name: 'autocomplete' },
        values: { q, resultsPerPage: '5', fields: '' },
      },
    };
  };

  const { data, ...restSwrReturn } = useSWR(
    debouncedQ && ['/autocomplete', debouncedQ],
    () => SearchApis.getSuggestions(resolvePayload(debouncedQ)),
    {}
  );

  return { ...restSwrReturn, data: data?.values?.['q.suggestions']?.split(',') || [], q, setQ: setQ.current };
};
