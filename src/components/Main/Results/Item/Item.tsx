import styled from '@emotion/styled';
import React from 'react';
import { SearchResult } from 'types';
import { Price } from './Price';
import { Availability } from './Availability';
import { Badge } from './Badge';
import tw from 'twin.macro';

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
    price: { single: price },
    catalogprice: { single: catalogprice },
  } = data;

  return (
    <a
      href={url.single}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={title.single}
      css={[
        tw`py-7.5 pr-4 border-0 border-b border-solid border-gray relative font-medium cursor-pointer !text-black hover:!no-underline`,
      ]}>
      <img src={image.single} alt='' css={[tw`w-full`]} />
      <Availability data={data} />
      <StyleTitle
        css={[tw`text-[16px] uppercase overflow-ellipsis overflow-hidden min-h-12`, isHovered && tw`underline`]}>
        {title.single}
      </StyleTitle>
      {catalogprice !== price ? (
        <div css={[tw`flex flex-wrap items-end`]}>
          <Price price={+catalogprice} css={[tw`text-md text-gray-light-1 line-through`]} />
          <Price price={+price} css={[tw`text-xl text-red-dark-1`]} />
        </div>
      ) : (
        <Price price={+price} css={[tw`text-xl text-red-dark-1`]} />
      )}

      <Badge data={data} />
    </a>
  );
};
