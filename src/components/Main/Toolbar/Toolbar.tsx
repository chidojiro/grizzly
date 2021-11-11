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
    <div className='tw-flex'>
      <Form.Select
        name='size'
        label='Page Size'
        options={pageSizeOptions}
        defaultValue={pageSizeOptions[0].value}
        className='tw-flex-shrink-0 tw-border-r tw-border-solid tw-rounded tw-border-gray'
      />
      <Form.Select
        name='sortBy'
        options={sortByOptions}
        label='Sort By'
        defaultValue={sortByOptions[0].value}
        className='tw-flex-shrink-0 tw-border-r tw-border-solid tw-rounded tw-border-gray'
      />
    </div>
  );

  const baseClassName =
    'tw-flex tw-items-center tw-justify-between tw-w-[calc(100%+15px)] tw-transform tw-translate-x-[-7.5px] tw-px-[15px]';

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
    <div
      className={classNames(
        'tw-h-[70px] tw-border-b tw-border-solid tw-border-gray tw-shadow-sm tw-bg-gray-light-3',
        baseClassName
      )}>
      <h1>
        Lathes - Metalworking
        <span className='tw-text-green'></span>
      </h1>
      {toolbarRight}
    </div>
  );
};
