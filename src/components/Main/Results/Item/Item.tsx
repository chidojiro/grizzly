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
      className='tw-py-7.5 tw-pr-4 tw-border-b tw-border-solid tw-border-gray tw-relative tw-font-medium tw-cursor-pointer'
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img src='https://cdn0.grizzly.com/pics/jpeg288/g/g0509g-161780729153902a3b854bdba72d6077.jpg' />
      <div className='tw-text-green tw-font-bold tw-text-[13px]'>In Stock</div>
      <StyleTitle
        className={classNames('tw-text-[16px] tw-uppercase tw-overflow-ellipsis tw-overflow-hidden', {
          underline: isHovered,
        })}>
        16" x 40" 3-Phase Gunsmithing Metal Lathe (G0509G)
      </StyleTitle>
      <div className='tw-flex tw-text-xl tw-text-red-dark-1'>
        <span className='tw-transform tw-scale-50 tw-translate-x-1 tw--translate-y-1'>$</span>12,500<span>.</span>
        <span className='tw-transform tw-scale-50 tw--translate-x-1 tw--translate-y-1'>00</span>
      </div>
      <Badge />
    </div>
  );
};
