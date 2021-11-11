import React from 'react';
import { Checkbox as BaseCheckbox, CheckboxProps } from 'components';
import { Field, FieldProps } from '../Field';

export type Props = CheckboxProps & Omit<FieldProps, 'component'>;

export const Checkbox = (props: Props) => {
  return <Field valueAsChecked {...props} component={BaseCheckbox} emptyValue={[]} />;
};
