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
    <div className='absolute top-0 left-0 flex text-white text-[13px]'>
      <div className='px-2 py-1 uppercase bg-red-light-1'>On Sale</div>
      <StyledBadgeEdge className='origin-left transform scale-x-90 bg-red-light-1' />
    </div>
  );
};
