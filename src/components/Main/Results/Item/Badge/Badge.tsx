import styled from '@emotion/styled';
import { SearchResult } from 'types';
import tw from 'twin.macro';

type Props = {
  data: SearchResult['values'];
};

const StyledBadgeRightEdge = styled.div`
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  width: 20px;
  transform: scale(110%);
  background-color: white;
`;

const StyledBadgeLeftEdge = styled.div`
  clip-path: polygon(0 0, 0% 100%, 100% 0);
  width: 20px;
  transform: scale(110%);
  background-color: white;
`;

export const Badge = ({ data }: Props) => {
  const { isnew, freight, freightcost_usa, outlet, instock, onspecial } = data;

  let background = tw``;
  let label = '';

  if (isnew === 'true') {
    background = tw`bg-cyan`;
    label = 'New Product';
  } else if (freight === 'true' && freightcost_usa === '0') {
    background = tw`bg-green`;
    label = 'Free Shipping!';
  } else if (outlet === 'true' && instock === 'true') {
    background = tw`bg-orange`;
    label = 'Act Fast';
  } else if (onspecial === 'true') {
    background = tw`bg-red-light-1`;
    label = 'On Sale';
  }

  if (!background || !label) return null;

  return (
    <div
      css={[
        tw`absolute top-0 left-0 flex text-white text-[13px]`,
        tw`sm:top-auto sm:left-auto sm:bottom-0 sm:right-0`,
        tw`sm:text-[13px]`,
        background,
      ]}>
      <StyledBadgeLeftEdge css={[tw`hidden sm:block`]} />
      <div css={[tw`px-2 py-1 uppercase`, tw`sm:text-[13px]`]}>{label}</div>
      <StyledBadgeRightEdge css={[tw`sm:hidden`]} />
    </div>
  );
};
