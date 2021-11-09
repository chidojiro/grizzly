import React from 'react';

export type ValueTransformProps<T = any> = {
  valueAs?: (value: T) => any;
  changeAs?: (value: any) => T;
};

export type Option = {
  label: string;
  value: string;
};
