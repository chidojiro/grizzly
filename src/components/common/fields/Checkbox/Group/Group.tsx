import { noop } from 'lodash';
import React from 'react';
import { Checkbox } from 'components';
import { useControllable } from 'hooks';
import { Option } from 'types';

type OwnProps<T = any> = {
  onChange?: (value: T[]) => void;
  value?: T[];
  name?: string;
  defaultValue?: T[];
  options?: Option[];
  error?: boolean;
};

export type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'ref' | keyof OwnProps
> &
  OwnProps;

export type GroupProvider = {
  groupProps?: Props;
  value: string[];
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const GroupContext = React.createContext<GroupProvider>({
  groupProps: undefined,
  value: [],
  handleChange: noop,
});

export const Group = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
  const {
    onChange: onChangeProp,
    defaultValue = [],
    value: valueProp,
    name,
    children,
    options = [],
    error,
    ...restProps
  } = props;

  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const eventValue = e.target.value as any;
      const isChecked = e.target.checked;

      setValue((prevValue: any) => {
        let newValue;
        if (isChecked) {
          newValue = [...prevValue, eventValue];
        } else {
          newValue = prevValue.filter((value: any) => value !== eventValue);
        }

        onChangeProp?.(newValue);
        return newValue;
      });
    },
    [onChangeProp, setValue]
  );

  const providerValue = React.useMemo(() => ({ handleChange, value, groupProps: props }), [handleChange, props, value]);

  return (
    <GroupContext.Provider value={providerValue}>
      <div {...restProps}>
        <input ref={ref} name={name} className='minimized' />
        {options.map(({ label, value: checkboxValue, ...rest }) => (
          <div className='relative flex items-center' key={JSON.stringify(checkboxValue)}>
            <Checkbox
              value={checkboxValue as any}
              onChange={handleChange}
              checked={value.includes(checkboxValue)}
              label={label}
              className='mr-2'
              error={error}
              name={name}
              {...rest}
            />
          </div>
        ))}
      </div>
    </GroupContext.Provider>
  );
});
