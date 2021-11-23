import { Form } from 'components';
import { useLocation } from 'react-router';
import { navigating, pageSizeOptions, sortByOptions } from 'consts';
import groupBy from 'lodash/groupBy';
import { usePagination, useSearch, useSearchParams } from 'hooks';
import tw from 'twin.macro';

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
    <div css={[tw`flex`]}>
      <Form.Select
        name='size'
        label='Page Size'
        options={pageSizeOptions}
        defaultValue={pageSizeOptions[0].value}
        css={[tw`flex-shrink-0 border-0 border-r border-solid rounded border-gray`]}
      />
      <Form.Select
        name='sortBy'
        options={sortByOptions}
        label='Sort By'
        defaultValue={sortByOptions[0].value}
        css={[tw`flex-shrink-0 border-0 border-r border-solid rounded border-gray`]}
      />
    </div>
  );

  const baseClassName = tw`flex items-center justify-between w-[calc(100% + 15px)] px-[15px]`;
  const baseStyles = { transform: 'translateX(-7.5px)' };

  if (pathname === '/search')
    return (
      <div css={[tw`h-[51px] shadow-md bg-white`, baseClassName]} style={baseStyles}>
        <div css={[tw`text-sm`]}>
          {showingRange.from} - {showingRange.to} of {showingRange.total} matches for{' '}
          <span css={[tw`font-medium text-green`]}>"{q}"</span>
        </div>
        {toolbarRight}
      </div>
    );

  return (
    <div
      css={[tw`h-[70px] border-0 border-b border-solid border-gray shadow-sm bg-gray-light-3`, baseClassName]}
      style={baseStyles}>
      <h1>
        {foundNavigating.DisplayText}
        <span css={[tw`text-green`]}></span>
      </h1>
      {toolbarRight}
    </div>
  );
};
