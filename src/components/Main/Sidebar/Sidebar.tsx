import { useSearch, useSearchParams } from 'hooks';
import React from 'react';
import { FilterInfo } from 'types';
import { CheckboxGroupFilterBox } from './CheckboxGroupFilterBox';

export const Sidebar = () => {
  const { filtersInfo } = useSearch();

  const { filters } = useSearchParams();

  const [filterFieldsWithSomeSelected, filterFieldsWithNoneSelected] = filtersInfo.reduce<FilterInfo[][]>(
    (acc, cur) => {
      if (filters[cur.name]?.length) {
        acc[0].push(cur);
      } else {
        acc[1].push(cur);
      }

      return acc;
    },
    [[], []]
  );

  return (
    <div className='tw-w-[250px] tw-border-r-2 tw-border-solid tw-border-gray-light-3 tw-text-[13px] tw-flex-shrink-0'>
      {filterFieldsWithSomeSelected.map(({ label, name, options }) => (
        <CheckboxGroupFilterBox key={name} name={`filters.${name}`} options={options} title={label} />
      ))}
      {filterFieldsWithNoneSelected.map(({ label, name, options }) => (
        <CheckboxGroupFilterBox key={name} name={`filters.${name}`} options={options} title={label} />
      ))}
    </div>
  );
};
