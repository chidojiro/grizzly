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
          'tw-flex tw-items-center tw-cursor-pointer tw-whitespace-pre-line tw-hover:text-green',
          { 'tw-text-error': error },
          { 'tw-text-dark-gray-2': !className?.includes('tw-text-black') },
          { 'tw-font-bold': isChecked },
          className
        )}>
        <div className='tw-flex tw-items-center tw-mr-2'>
          <input
            className='tw-w-0 tw-h-0 tw-overflow-hidden'
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
              'tw-relative tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center tw-rounded-sm tw-border tw-border-solid tw-border-[#aaa]',
              {
                'tw-bg-green !tw-border-green': isChecked,
              }
            )}>
            <FontAwesomeIcon icon={faCheck} className='tw-text-white' />
          </div>
        </div>
        {label}
      </label>
    );
  }
);
