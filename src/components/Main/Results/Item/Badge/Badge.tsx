import styled from '@emotion/styled';
import { SearchResult } from 'types';
import tw from 'twin.macro';

type Props = {
  data: SearchResult['values'];
};

const StyledBadgeEdge = styled.div`
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  width: 20px;
  transform: scale(105%);
`;

export const Badge = ({ data }: Props) => {
  const { isnew, freight, freightcost_usa, outlet, instock, onspecial } = data;

  let background = tw``;
  let label = '';

  if (isnew.single === 'true') {
    background = tw`bg-cyan`;
    label = 'New Product';
  } else if (freight.single === 'true' && freightcost_usa.single === '0') {
    background = tw`bg-green`;
    label = 'Free Shipping!';
  } else if (outlet.single === 'true' && instock.single === 'true') {
    background = tw`bg-orange`;
    label = 'Act Fast';
  } else if (onspecial.single === 'true') {
    background = tw`bg-red-light-1`;
    label = 'On Sale';
  }

  if (!background || !label) return null;

  return (
    <div css={[tw`absolute top-0 left-0 flex text-white text-[13px]`, background]}>
      <div css={[tw`px-2 py-1 uppercase`]}>{label}</div>
      <StyledBadgeEdge css={[tw`bg-white`]} />
    </div>
  );
};
