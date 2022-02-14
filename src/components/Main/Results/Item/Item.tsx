import styled from '@emotion/styled';
import React from 'react';
import { SearchResult } from 'types';
import { Price } from './Price';
import { Availability } from './Availability';
import { Badge } from './Badge';
import tw from 'twin.macro';
import { SearchApis } from 'apis';
import { useHistory } from 'react-router';

const StyleTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

type Props = {
  data: SearchResult['values'];
  posNegToken: any;
};

export const Item = ({ data, posNegToken }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const history = useHistory();

  const { image, title, url, price, catalogprice } = data;

  const handleClick = async () => {
    try {
      await SearchApis.sendClickEvent(data.id, posNegToken);
    } finally {
      window.location.href = url;
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={title}
      css={[
        tw`py-7.5 pr-4 border-0 border-b border-solid border-gray relative font-medium cursor-pointer !text-black hover:!no-underline`,
        tw`sm:flex sm:pt-[10px] sm:pr-[10px] sm:pb-[5px]`,
      ]}>
      <div>
        <div css={[tw`flex items-center justify-center`]}>
          <img src={image} alt='' css={[tw`w-full max-w-[255px] mx-auto mb-[15px]`, tw`sm:w-[100px] sm:p-2`]} />
        </div>
        <Availability data={data} />
      </div>
      <div>
        <StyleTitle
          css={[
            tw`text-[16px] uppercase overflow-ellipsis overflow-hidden min-h-12`,
            tw`sm:text-sm`,
            isHovered && tw`underline`,
          ]}>
          {title}
        </StyleTitle>
        {catalogprice !== price ? (
          <div css={[tw`flex flex-wrap items-end`]}>
            <Price price={+catalogprice} css={[tw`line-through text-md text-gray-light-1`, tw`sm:text-sm`]} />
            <Price price={+price} css={[tw`text-xl text-red-dark-1`, tw`sm:text-md`]} />
          </div>
        ) : (
          <Price price={+price} css={[tw`text-xl text-red-dark-1`, tw`sm:text-md`]} />
        )}
      </div>

      <Badge data={data} />
    </div>
  );
};
