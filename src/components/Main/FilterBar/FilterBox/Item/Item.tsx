import React from 'react';
import { Children, ClassName } from 'types';
import tw from 'twin.macro';

type Props = Children & ClassName;

export const Item = ({ children, className }: Props) => {
  return (
    <div css={[tw`flex items-center justify-between`]} className={className}>
      <div css={[tw`flex items-center cursor-pointer`]}>{children}</div>
    </div>
  );
};
