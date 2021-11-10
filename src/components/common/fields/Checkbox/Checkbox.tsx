import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

      groupProviderValue?.handleChange(e);
    };

    const isChecked = groupProviderValue ? groupProviderValue.value.includes(valueProp) : checked;

    return (
      <label
        className={classNames(
          'gl-checkbox',
          'flex items-center cursor-pointer whitespace-pre-line hover:text-green',
          { 'text-error': error },
          { 'text-dark-gray-2': !className?.includes('text-black') },
          { 'font-bold': isChecked },
          className
        )}>
        <div className='flex items-center mr-2'>
          <input
            className='w-0 h-0 overflow-hidden'
            type='checkbox'
            {...restProps}
            ref={ref}
            disabled={disabled}
            value={valueProp}
            checked={isChecked}
            onChange={handleChange}
          />
          <div
            className={classNames(
              'relative w-4 h-4 flex items-center justify-center rounded-sm border border-solid border-gray',
              {
                'bg-green border-green': isChecked,
              }
            )}>
            <FontAwesomeIcon icon={faCheck} className='text-white' />
          </div>
        </div>
        {label}
      </label>
    );
  }
);
