import React from 'react';
import { Children } from 'types';
import tw from 'twin.macro';

type Props = Children;

export const Item = ({ children }: Props) => {
  return (
    <div css={[tw`flex items-center justify-between`]}>
      <div css={[tw`flex items-center cursor-pointer`]}>{children}</div>
    </div>
  );
};
