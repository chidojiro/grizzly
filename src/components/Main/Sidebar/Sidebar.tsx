import { Checkbox, Form } from 'components';
import { useSearch } from 'hooks';
import { FilterBox } from './FilterBox';

export const Sidebar = () => {
  const { filtersOptions } = useSearch();

  return (
    <div className='tw-w-[250px] tw-border-r-2 tw-border-solid tw-border-gray-light-3 tw-text-[13px] tw-flex-shrink-0'>
      {Object.keys(filtersOptions).map(fieldName => (
        <FilterBox key={fieldName}>
          <Form.CheckboxGroup name={`filters.${fieldName}`} defaultValue={[]}>
            <FilterBox.Title>{fieldName}</FilterBox.Title>
            {filtersOptions[fieldName].map(option => (
              <FilterBox.Item key={option}>
                <Checkbox label={option} value={option} />
              </FilterBox.Item>
            ))}
          </Form.CheckboxGroup>
        </FilterBox>
      ))}
    </div>
  );
};
