import styled from '@emotion/styled';
import classNames from 'classnames';
import { SearchResult } from 'types';

type Props = {
  data: SearchResult['values'];
};

const StyledBadgeEdge = styled.div`
  clip-path: polygon(0 0, 0% 100%, 100% 0);
  width: 20px;
`;

export const Badge = ({ data }: Props) => {
  const { isnew, freight, freightcost_usa, outlet, instock, onspecial } = data;

  let background = '';
  let label = '';

  if (isnew.single === 'true') {
    background = 'tw-bg-cyan';
    label = 'New Product';
  } else if (freight.single === 'true' && freightcost_usa.single === '0') {
    background = 'tw-bg-green';
    label = 'Free Shipping!';
  } else if (outlet.single === 'true' && instock.single === 'true') {
    background = 'tw-bg-orange';
    label = 'Act Fast';
  } else if (onspecial.single === 'true') {
    background = 'tw-bg-red-light-1';
    label = 'On Sale';
  }

  if (!background || !label) return null;

  return (
    <div className='tw-absolute tw-top-0 tw-left-0 tw-flex tw-text-white tw-text-[13px]'>
      <div className={classNames('tw-px-2 tw-py-1 tw-uppercase', background)}>{label}</div>
      <StyledBadgeEdge className={classNames('tw-origin-left tw-transform tw-scale-x-90', background)} />
    </div>
  );
};
