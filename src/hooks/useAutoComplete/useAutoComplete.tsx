import { SearchApis } from 'apis';
import { metadata } from 'consts';
import React from 'react';
import useSWR from 'swr';
import { SearchAutoCompleteRequestPayload } from 'types';

export const useAutoComplete = () => {
  const [q, setQ] = React.useState('');

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
        values: { q: 's', resultsPerPage: '5', fields: '' },
      },
    };
  };

  const { data, ...restSwrReturn } = useSWR(['/autocomplete', q], (q: string) =>
    SearchApis.getSuggestions(resolvePayload(q))
  );

  return { ...restSwrReturn, data: data?.values['q.suggestions']?.split(',') || [], q, setQ };
};
