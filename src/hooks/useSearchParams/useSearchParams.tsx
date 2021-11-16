import React from 'react';
import { SearchParamsContext } from 'provider/SearchParamsProvider/SearchParamsProvider';

export const useSearchParams = () => {
  return React.useContext(SearchParamsContext);
};
