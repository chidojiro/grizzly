import React from 'react';
import { CheckboxGroup as BaseCheckboxGroup, CheckboxGroupProps } from 'components';
import { Field, FieldProps } from '../../Field';

export type Props = CheckboxGroupProps & Omit<FieldProps, 'component'>;

export const Group = (props: Props) => {
  return <Field {...props} component={BaseCheckboxGroup} />;
};
