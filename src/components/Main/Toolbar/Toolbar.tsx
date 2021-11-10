import classNames from 'classnames';
import { Form } from 'components';
import { useQuery } from 'hooks';
import { useLocation, useParams } from 'react-router';
import { Option } from 'types';

const sortByOptions: Option[] = [
  { value: 'relevance+desc', label: 'Sort: Best Match' },
  { value: 'reviewrating+desc', label: 'Sort: Review Rating' },
  { value: 'popularity+desc', label: 'Sort: Popularity' },
  { value: 'price+asc', label: 'Sort: Price Low to High' },
  { value: 'price+desc', label: 'Sort: Price High to Low' },
  { value: 'itemnumber+asc', label: 'Sort: Model Number' },
];

const pageSizeOptions: Option[] = [
  { value: '25', label: '25 Items Per Page' },
  { value: '50', label: '50 Items Per Page' },
  { value: '75', label: '75 Items Per Page' },
  { value: '100', label: '100 Items Per Page' },
];

export const Toolbar = () => {
  const { pathname } = useLocation();

  const toolbarRight = (
    <div className='flex'>
      <Form.Select
        name='pageSize'
        label='Page Size'
        options={pageSizeOptions}
        defaultValue={pageSizeOptions[0].value}
        className='flex-shrink-0 border-r border-solid rounded border-gray'
      />
      <Form.Select
        name='sortBy'
        options={sortByOptions}
        label='Sort By'
        defaultValue={sortByOptions[0].value}
        className='flex-shrink-0 border-r border-solid rounded border-gray'
      />
    </div>
  );

  const baseClassName =
    'flex items-center justify-between w-[calc(100%+15px)] transform translate-x-[-7.5px] px-[15px]';

  if (pathname === '/search')
    return (
      <div className={classNames('h-[51px] shadow-md bg-white', baseClassName)}>
        <div className='text-sm'>
          1 - 25 of 40 matches for{' '}
          <span className='font-medium text-green'>"(categoryid:161) AND (category:"Router Bit Sets")"</span>
        </div>
        {toolbarRight}
      </div>
    );

  return (
    <div className={classNames('h-[70px] border-b border-solid border-gray shadow-sm bg-gray-light-3', baseClassName)}>
      <h1>
        Lathes - Metalworking
        <span className='text-green'></span>
      </h1>
      {toolbarRight}
    </div>
  );
};
