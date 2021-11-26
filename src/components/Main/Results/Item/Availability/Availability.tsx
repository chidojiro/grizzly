import { SearchResult } from 'types';
import tw from 'twin.macro';

export type Props = {
  data: SearchResult['values'];
};

export const Availability = ({ data: { instock, quantityavailable } }: Props) => {
  let color = tw``;
  let background = tw``;
  let label = '';
  let padding = tw``;

  if (instock === 'true') {
    color = tw`text-green`;
    label = 'In Stock';
  } else if (quantityavailable === '0') {
    color = tw`text-[#ae0101]`;
    label = 'More on the Way';
  } else {
    color = tw`text-black`;
    label = 'Special Order Item';
    background = tw`bg-yellow`;
    padding = tw`px-[10px] py-[5px]`;
  }

  if (!label) return null;

  return (
    <div css={[tw`font-bold text-[13px] rounded text-center w-fit`, tw`sm:text-[12px]`, color, background, padding]}>
      {label}
    </div>
  );
};
