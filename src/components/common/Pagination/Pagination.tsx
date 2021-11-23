import classNames from 'classnames';
import { PaginationItem, usePagination, UsePaginationProps } from 'hooks';
import tw from 'twin.macro';

type Props = UsePaginationProps;

export const Pagination = (props: Props) => {
  const { items } = usePagination(props);

  const resolveItemLabel = (type: PaginationItem['type'], page?: number) => {
    switch (type) {
      case 'previous':
        return '← Previous';
      case 'page':
        return page;
      case 'ellipsis':
        return '...';
      case 'next':
        return 'Next →';
      default:
        return '';
    }
  };

  return (
    <div className='search-pagination' css={[tw`flex items-center h-[33px] gap-1 mx-auto w-fit`]}>
      {items.map(({ type, disabled, onClick, page, selected }, idx) => (
        <button
          type='button'
          key={type + page}
          onClick={onClick}
          disabled={disabled}
          className={classNames('btn btn-default', {
            active: selected,
            'search-page': type === 'page',
          })}
          css={[tw`!text-[13px]`, disabled && tw`cursor-default`]}>
          {resolveItemLabel(type, page)}
        </button>
      ))}
    </div>
  );
};
