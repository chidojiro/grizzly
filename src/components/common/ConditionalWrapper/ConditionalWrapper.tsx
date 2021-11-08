import { ReactNode } from 'react';

type Props = {
  active: boolean;
  component: 'div' | ((...props: any[]) => JSX.Element);
  children: ReactNode;
  [key: string]: any;
};

export const ConditionalWrapper = ({ active, component: Component, children, ...componentProps }: Props) => {
  if (!active) return <>{children}</>;

  return <Component {...componentProps}>{children}</Component>;
};
