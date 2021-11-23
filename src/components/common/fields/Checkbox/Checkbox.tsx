import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { GroupContext, GroupProvider } from './Group/Group';
import tw from 'twin.macro';

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
        className={classNames('gl-checkbox', className)}
        css={[tw`flex items-center cursor-pointer whitespace-pre-line hover:text-green`, isChecked && tw`font-bold`]}>
        <div css={[tw`flex items-center mr-2`]}>
          <input
            type='checkbox'
            {...restProps}
            ref={ref}
            disabled={disabled}
            value={valueProp}
            checked={isChecked}
            onChange={handleChange}
            css={[tw`w-0 h-0 overflow-hidden`]}
          />
          <div
            css={[
              tw`relative w-4 h-4 flex items-center justify-center rounded-sm border border-solid border-[#aaa]`,
              isChecked && tw`bg-green !border-green`,
            ]}>
            <FontAwesomeIcon icon={faCheck} css={[tw`text-white`]} />
          </div>
        </div>
        {label}
      </label>
    );
  }
);
