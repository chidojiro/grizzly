import { SearchResult } from 'types';
import tw from 'twin.macro';
import isEqual from 'lodash/isEqual';

export type Props = {
  data: SearchResult['values'];
};

export const Availability = ({ data: { instock, quantityavailable, special_order, title } }: Props) => {
  let color = tw``;
  let background = tw``;
  let label = '';
  let padding = tw``;

  if (isEqual(special_order, ['1'])) {
    color = tw`text-black`;
    label = 'Special Order Item';
    background = tw`bg-yellow`;
    padding = tw`px-[10px] py-[5px]`;
  } else if (instock === 'true') {
    color = tw`text-green`;
    label = 'Ready To Ship';
  } else {
    color = tw`text-[#ae0101]`;
    label = 'More on the Way';
  }

  if (!label) return null;

  return (
    <div css={[tw`font-bold text-[13px] rounded text-center w-fit`, tw`sm:text-[12px]`, color, background, padding]}>
      {label}
    </div>
  );
};
