import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useControllable } from 'hooks';
import React from 'react';
import { Option } from 'types';
import tw from 'twin.macro';

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
        className={classNames('gl-select', className)}
        css={[tw`relative cursor-default w-77 text-sm py-[5px] pl-[15px] bg-white h-[51px]`]}>
        <select
          {...restProps}
          ref={ref}
          value={value}
          onChange={setValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          css={[tw`absolute top-0 left-0 z-50 w-full h-full opacity-0 after:hidden`]}>
          {options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <div
          css={[tw`absolute top-0 left-0 w-full h-full transition-all py-[5px] pr-[15px] pl-[5px]`]}
          style={{ outline: isFocused ? '3px solid rgba(0, 123, 255, 0.3)' : '', transition: 'none' }}>
          <div css={[tw`text-gray-light-1`]}>{label}</div>
          <div css={[tw`text-gray-dark-1`]}>{selectedOption?.label}</div>
          <FontAwesomeIcon icon={faCaretDown} css={[tw`absolute top-1 right-1.5 text-gray-light-1`]} />
        </div>
      </div>
    );
  }
);
