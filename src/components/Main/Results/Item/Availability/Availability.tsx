import classNames from 'classnames';
import { SearchResult } from 'types';

export type Props = {
  data: SearchResult['values'];
};

export const Availability = ({ data: { instock, quantityavailable } }: Props) => {
  let color = '';
  let background = '';
  let label = '';
  let padding = '';

  if (instock.single === 'true') {
    color = 'tw-text-green';
    label = 'In Stock';
  } else if (quantityavailable.single === '0') {
    color = 'tw-text-[#ae0101]';
    label = 'More on the Way';
  } else {
    color = 'tw-text-black';
    label = 'Special Order Item';
    background = 'tw-bg-yellow';
    padding = 'px-[10px] py-[5px]';
  }

  if (!label) return null;

  return (
    <div
      className={classNames(
        'tw-font-bold tw-text-[13px] tw-rounded tw-text-center tw-w-fit',
        color,
        background,
        padding
      )}>
      {label}
    </div>
  );
};
