import React from 'react';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';
import { ClassName } from 'types';

export type FormFieldProps = ClassName & {
  rules?: RegisterOptions;
  name: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  defaultValue?: any;
  valueAsChecked?: boolean;
  value?: any;
  emptyValue?: any;
};

export type Props = FormFieldProps & {
  component: React.ComponentType;
};

export const Field = ({
  component,
  name,
  rules,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  defaultValue,
  valueAsChecked,
  value: valueProp,
  emptyValue = '',
  ...restProps
}: Props) => {
  const Component = component;

  const { setValue } = useFormContext();

  const {
    field: { onChange, onBlur, value, ...restField },
  } = useController({ name, rules });

  React.useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue, { shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e);
    onChangeProp?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    onBlur();
    onBlurProp?.(e);
  };

  const resolveValue = () => {
    const _value = valueAsChecked ? valueProp : value;

    if (rules?.valueAsNumber) {
      return +_value;
    }

    if (rules?.valueAsDate) {
      return new Date(_value);
    }

    return _value;
  };

  return (
    <Component
      onChange={handleChange}
      onBlur={handleBlur}
      value={resolveValue() ?? emptyValue}
      checked={valueAsChecked && !!value}
      {...restField}
      {...(restProps as any)}
    />
  );
};
