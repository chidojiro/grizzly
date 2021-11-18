import classNames from 'classnames';
import { Form } from 'components';
import { useLocation } from 'react-router';
import { Option } from 'types';
import { navigating } from 'consts';
import groupBy from 'lodash/groupBy';
import { usePagination, useSearch, useSearchParams } from 'hooks';

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

const navigatingGroupedByVirtualPath = groupBy(navigating, 'VirtualPath');

export const Toolbar = () => {
  const { pathname } = useLocation();

  const { data } = useSearch();

  const {
    searchResponse: { totalResults },
  } = data || { searchResponse: {} };

  const { page, perPage, q } = useSearchParams();

  const { showingRange } = usePagination({ totalRecord: totalResults ? +totalResults : 0, page, perPage });

  const foundNavigating = navigatingGroupedByVirtualPath[pathname]?.[0];

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
      <div className={classNames('tw-h-[51px] tw-shadow-md tw-bg-white', baseClassName)}>
        <div className='tw-text-sm'>
          {showingRange.from} - {showingRange.to} of {showingRange.total} matches for{' '}
          <span className='tw-font-medium tw-text-green'>"{q}"</span>
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
        {foundNavigating.DisplayText}
        <span className='tw-text-green'></span>
      </h1>
      {toolbarRight}
    </div>
  );
};
