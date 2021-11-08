import React from 'react';

type UseControllableProps<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (e: any) => void;
  valueAs?: (value: T) => any;
  changeAs?: (value: any) => T;
};

export const useControllable = <T>({
  value: valueProp,
  onChange,
  defaultValue,
  valueAs,
  changeAs,
}: UseControllableProps<T>): any => {
  const isControlled = valueProp !== undefined && valueProp !== null;

  const [value, setValue] = React.useState(defaultValue);

  const _setValue = React.useCallback(
    (event: T | React.ChangeEvent<any>) => {
      const value = (event as React.ChangeEvent<any>).target?.value ?? event;

      setValue(value);
      onChange?.(event);
    },
    [onChange]
  );

  const UncontrolledState = React.useMemo(() => [value, _setValue], [_setValue, value]);

  if (isControlled)
    return [valueAs ? valueAs(valueProp as any) : valueProp, (e: any) => onChange?.(changeAs ? changeAs(e) : e)];

  return UncontrolledState;
};
