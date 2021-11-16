import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';
import { SearchResult } from 'types';
import { Price } from './Price';
import { Availability } from './Availability';
import { Badge } from './Badge';

const StyleTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

type Props = {
  data: SearchResult['values'];
};

export const Item = ({ data }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const {
    image,
    title,
    url,
    price: { single: originalPrice },
    absolutediscount: { single: absolutediscount },
  } = data;

  const price = +originalPrice - +absolutediscount;

  return (
    <a
      href={url.single}
      className='tw-py-7.5 tw-pr-4 tw-border-b tw-border-solid tw-border-gray tw-relative tw-font-medium tw-cursor-pointer'
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img src={image.single} alt='' />
      <Availability data={data} />
      <StyleTitle
        className={classNames('tw-text-[16px] tw-uppercase tw-overflow-ellipsis tw-overflow-hidden tw-min-h-12', {
          'tw-underline': isHovered,
        })}>
        {title.single}
      </StyleTitle>
      {+absolutediscount ? (
        <div className='tw-flex tw-flex-wrap tw-items-end'>
          <Price price={+originalPrice} obsolete />
          <Price price={price} className='tw-transform tw--translate-x-3' />
        </div>
      ) : (
        <Price price={price} />
      )}

      <Badge data={data} />
    </a>
  );
};
