import { Item } from './Item';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const FilterBox = (props: Props) => {
  return <div {...props} css={[tw`flex-1 pb-2`]}></div>;
};

FilterBox.Title = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <div {...props} css={[tw`text-[13px] mb-2`]}>
    {props.children}
  </div>
);
FilterBox.Item = Item;
