import classNames from 'classnames';
import { PaginationItem, usePagination, UsePaginationProps } from 'hooks';

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
    <div className='search-pagination flex items-center h-[33px] gap-1 mx-auto w-fit'>
      {items.map(({ type, disabled, onClick, page, selected }, idx) => (
        <button
          type='button'
          className={classNames('btn btn-default !text-[13px]', { active: selected, 'search-page': type === 'page' })}
          key={type + page}
          onClick={onClick}
          disabled={disabled}>
          {resolveItemLabel(type, page)}
        </button>
      ))}
    </div>
  );
};