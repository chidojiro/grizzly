export type ValueTransformProps<T = any> = {
  valueAs?: (value: T) => any;
  changeAs?: (value: any) => T;
};
