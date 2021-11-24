import { filterAliases, filterFields } from 'consts';
import { usePriceFilterInfo, useSearch, useSearchParams } from 'hooks';
import React from 'react';
import { FilterInfo } from 'types';

export const useFilterInfo = () => {
  const { hasSelectedFilter, q } = useSearchParams();
  const { data } = useSearch();
  const { data: priceFilterInfo } = usePriceFilterInfo();

  const aggregateFilters = data?.searchResponse?.aggregateFilters || {};

  const filtersInfo = Object.keys(aggregateFilters).reduce<FilterInfo[]>((acc, curField) => {
    const [type, field] = curField.split('.');

    if (type !== 'count' || !field || q.includes(field) || ['altcategory', 'categoryid', 'category1'].includes(field))
      return acc;

    const options = Object.keys(aggregateFilters[curField].count.counts || {})
      .filter(Boolean)
      .map(option => ({ label: option.replaceAll(' in.', '"'), value: option }))
      .filter(Boolean);

    if (!hasSelectedFilter(field) && options.length < 2) return acc;

    const foundFilterField = filterFields.find(({ name }) => name === field);
    const fieldAlias = filterAliases[foundFilterField?.name || ''];

    return [
      ...acc,
      {
        ...foundFilterField,
        name: fieldAlias || foundFilterField?.name,
        options,
      },
    ] as FilterInfo[];
  }, []);

  const sortedFiltersInfo = React.useMemo(
    () => filtersInfo.sort((a, b) => ('' + a.name).localeCompare(b.name)),
    [filtersInfo]
  );

  return React.useMemo(() => [priceFilterInfo, ...sortedFiltersInfo], [priceFilterInfo, sortedFiltersInfo]);
};
