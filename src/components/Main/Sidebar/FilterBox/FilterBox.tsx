import { Item } from './Item';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const FilterBox = (props: Props) => {
  return <div className='flex-1 pb-5' {...props}></div>;
};

FilterBox.Title = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <div {...props} className='text-[13px] mb-2'>
    {props.children}
  </div>
);
FilterBox.Item = Item;
