import React from 'react';
import tw from 'twin.macro';
import { FilterBar } from '../FilterBar';

export const Sidebar = () => {
  return (
    <div css={[tw`flex-shrink-0 border-0 border-r-2 border-solid border-gray-light-3 md:hidden`]}>
      <FilterBar />
    </div>
  );
};
