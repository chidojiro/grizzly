import { Checkbox, Form } from 'components';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Option } from 'types';
import { FilterBox } from '../FilterBox';

const DEFAULT_VISIBLE_ITEMS_COUNT = 5;

type Props = {
  name: string;
  title: string;
  options: Option[];
};

export const CheckboxGroupFilterBox = ({ name, options, title }: Props) => {
  const { watch } = useFormContext();
  const selectedOptions = (watch(name) as string[]) || [];

  const [isShowingMore, setIsShowingMore] = React.useState(
    selectedOptions.some(selectedOption => {
      const optionIndex = options.findIndex(({ value }) => value === selectedOption);

      return optionIndex >= DEFAULT_VISIBLE_ITEMS_COUNT;
    })
  );

  const visibleItems = isShowingMore ? options : options.slice(0, 5);

  const displayShowMoreToggle = options.length > DEFAULT_VISIBLE_ITEMS_COUNT;

  return (
    <FilterBox>
      <Form.CheckboxGroup name={name} defaultValue={[]}>
        <FilterBox.Title>{title}</FilterBox.Title>
        {visibleItems.map(({ label, value }) => (
          <FilterBox.Item key={value}>
            <Checkbox label={label} value={value} />
          </FilterBox.Item>
        ))}
      </Form.CheckboxGroup>
      {displayShowMoreToggle && (
        <div
          className='tw-text-xs tw-text-green hover:tw-underline tw-cursor-pointer'
          onClick={() => setIsShowingMore(p => !p)}>
          {isShowingMore ? 'Show Less...' : 'Show More...'}
        </div>
      )}
    </FilterBox>
  );
};
