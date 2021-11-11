import { Item } from './Item';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const FilterBox = (props: Props) => {
  return <div className='tw-flex-1 tw-pb-2' {...props}></div>;
};

FilterBox.Title = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <div {...props} className='tw-text-[13px] tw-mb-2'>
    {props.children}
  </div>
);
FilterBox.Item = Item;
