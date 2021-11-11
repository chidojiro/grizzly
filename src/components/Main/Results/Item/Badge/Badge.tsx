import styled from '@emotion/styled';

type Props = {
  type: 'SALE' | 'ACT_FAST';
};

const StyledBadgeEdge = styled.div`
  clip-path: polygon(0 0, 0% 100%, 100% 0);
  width: 20px;
`;

export const Badge = () => {
  return (
    <div className='tw-absolute tw-top-0 tw-left-0 tw-flex tw-text-white tw-text-[13px]'>
      <div className='tw-px-2 tw-py-1 tw-uppercase tw-bg-red-light-1'>On Sale</div>
      <StyledBadgeEdge className='tw-origin-left tw-transform tw-scale-x-90 tw-bg-red-light-1' />
    </div>
  );
};
