import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';
import { Badge } from './Badge';

const StyleTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Item = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className='py-7.5 pr-4 border-b border-solid border-gray relative font-medium cursor-pointer'
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img src='https://cdn0.grizzly.com/pics/jpeg288/g/g0509g-161780729153902a3b854bdba72d6077.jpg' />
      <div className='text-green font-bold text-[13px]'>In Stock</div>
      <StyleTitle
        className={classNames('text-[16px] uppercase overflow-ellipsis overflow-hidden', { underline: isHovered })}>
        16" x 40" 3-Phase Gunsmithing Metal Lathe (G0509G)
      </StyleTitle>
      <div className='flex text-xl text-red-dark-1'>
        <span className='transform scale-50 translate-x-1 -translate-y-1'>$</span>12,500<span>.</span>
        <span className='transform scale-50 -translate-x-1 -translate-y-1'>00</span>
      </div>
      <Badge />
    </div>
  );
};
