import React from 'react';
import { Select as BaseSelect, SelectProps } from 'components';
import { Field, FieldProps } from '../Field';

export type Props = SelectProps & Omit<FieldProps, 'component'>;

const Select = (props: Props) => {
  return <Field {...props} component={BaseSelect as any} />;
};

export default Select;
