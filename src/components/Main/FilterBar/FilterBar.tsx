import { useFilterInfo, useSearchParams } from 'hooks';
import React from 'react';
import tw from 'twin.macro';
import { FilterInfo } from 'types';
import { CheckboxGroupFilterBox } from './CheckboxGroupFilterBox';

export const FilterBar = () => {
  const filtersInfo = useFilterInfo();

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
    <div css={[tw`w-[250px] text-[13px] flex-shrink-0`]}>
      {filterFieldsWithSomeSelected.map(({ label, name, options }) => (
        <CheckboxGroupFilterBox key={name} name={`filters.${name}`} options={options} title={label} />
      ))}
      {filterFieldsWithNoneSelected.map(({ label, name, options }) => (
        <CheckboxGroupFilterBox key={name} name={`filters.${name}`} options={options} title={label} />
      ))}
    </div>
  );
};
