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
        tw`sm:flex sm:pt-[10px] sm:pr-[10px] sm:pb-[5px]`,
      ]}>
      <div>
        <img src={image.single} alt='' css={[tw`w-full`, tw`sm:w-[100px] sm:p-2`]} />
        <Availability data={data} />
      </div>
      <div>
        <StyleTitle
          css={[
            tw`text-[16px] uppercase overflow-ellipsis overflow-hidden min-h-12`,
            tw`sm:text-sm`,
            isHovered && tw`underline`,
          ]}>
          {title.single}
        </StyleTitle>
        {catalogprice !== price ? (
          <div css={[tw`flex flex-wrap items-end`]}>
            <Price price={+catalogprice} css={[tw`text-md text-gray-light-1 line-through`, tw`sm:text-sm`]} />
            <Price price={+price} css={[tw`text-xl text-red-dark-1`, tw`sm:text-md`]} />
          </div>
        ) : (
          <Price price={+price} css={[tw`text-xl text-red-dark-1`, tw`sm:text-md`]} />
        )}
      </div>

      <Badge data={data} />
    </a>
  );
};
