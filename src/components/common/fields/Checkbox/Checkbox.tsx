import classNames from 'classnames';
import React from 'react';
import { GroupContext, GroupProvider } from './Group/Group';

export type Props = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'value'
> & {
  ref?: React.Ref<HTMLInputElement>;
  label?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  value?: string;
};

export const Checkbox = React.forwardRef(
  (
    { disabled, label, className, error, onChange: onChangeProp, value: valueProp = '', checked, ...restProps }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const groupProviderValue = React.useContext<GroupProvider>(GroupContext);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      onChangeProp?.(e);

      groupProviderValue.handleChange(e);
    };

    return (
      <label
        className={classNames(
          'vs-checkbox',
          'control control-checkbox flex items-center cursor-pointer whitespace-pre-line',
          { 'text-error': error },
          { 'text-dark-gray-2': !className?.includes('text-black') },
          className
        )}>
        <div className='flex items-center mr-2'>
          <input
            type='checkbox'
            {...restProps}
            ref={ref}
            disabled={disabled}
            value={valueProp}
            checked={groupProviderValue ? groupProviderValue.value.includes(valueProp) : checked}
            onChange={groupProviderValue ? groupProviderValue.handleChange : onChangeProp}
          />
        </div>
        {label}
      </label>
    );
  }
);
