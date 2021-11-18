import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useControllable } from 'hooks';
import React from 'react';
import { Option } from 'types';

export type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  options?: Option[];
  label: string;
};

export const Select = React.forwardRef(
  (
    { options = [], className, value: valueProp, onChange: onChangeProp, defaultValue, label, ...restProps }: Props,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const [value, setValue] = useControllable({
      value: valueProp,
      onChange: onChangeProp,
      defaultValue: defaultValue || options[0]?.value,
    });

    const selectedOption = options.find(({ value: _value }) => _value === value);

    return (
      <div
        className={classNames(
          'gl-select',
          'tw-relative tw-cursor-default tw-w-77 tw-text-sm tw-py-[5px] tw-pl-[15px] tw-bg-white tw-h-[51px]',
          className
        )}>
        <select
          {...restProps}
          ref={ref}
          value={value}
          onChange={setValue}
          className='tw-absolute tw-top-0 tw-left-0 tw-z-50 tw-w-full tw-h-full tw-opacity-0 tw-after:hidden'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}>
          {options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <div
          className={classNames(
            'tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-transition-all tw-py-[5px] tw-pr-[15px] tw-pl-[5px]',
            {
              'tw-ring tw-ring-blue-light-1 tw-ring-opacity-50': isFocused,
            }
          )}>
          <div className='tw-text-gray-light-1'>{label}</div>
          <div className='tw-text-gray-dark-1'>{selectedOption?.label}</div>
          <FontAwesomeIcon icon={faCaretDown} className='tw-absolute tw-top-1 tw-right-1.5 tw-text-gray-light-1' />
        </div>
      </div>
    );
  }
);
