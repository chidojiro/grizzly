import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Drawer, Form } from 'components';
import { pageSizeOptions, sortByOptions } from 'consts';
import { usePagination, useSearch, useSearchParams, useVisibilityControl } from 'hooks';
import { useLocation } from 'react-router';
import tw from 'twin.macro';
import { FilterBar } from '../FilterBar';

const displayText = (window as any).displayText;

export const Toolbar = () => {
  const { data } = useSearch();
  const control = useVisibilityControl();

  const { totalResults } = data || { searchResponse: {} };

  const { page, perPage } = useSearchParams();

  const { showingRange } = usePagination({ totalRecord: totalResults ? +totalResults : 0, page, perPage });

  const toolbarRight = (
    <div css={[tw`flex flex-1`, tw`border-0 border-solid sm:border-t border-gray`]}>
      <Form.Select
        name='size'
        label='Page Size'
        options={pageSizeOptions}
        defaultValue={pageSizeOptions[0].value}
        css={[tw`flex-1 flex-shrink-0 border-0 border-r border-solid rounded border-gray`, tw`sm:flex-1`]}
      />
      <Form.Select
        name='sortBy'
        options={sortByOptions}
        label='Sort By'
        defaultValue={sortByOptions[0].value}
        css={[tw`flex-1 flex-shrink-0 border-0 border-r border-solid rounded border-gray`, tw`sm:flex-1`]}
      />
      <Drawer control={control} anchor='right' size='fit'>
        <FilterBar />
      </Drawer>
      <div
        css={[
          tw`items-center justify-center px-5 border border-solid rounded cursor-pointer border-gray`,
          tw`hidden md:flex`,
        ]}
        onClick={control.show}>
        <FontAwesomeIcon icon={faFilter} />
      </div>
    </div>
  );

  const baseClassName = tw`flex items-center justify-between w-[calc(100% + 15px)] px-[15px] sm:px-0`;
  const baseStyles = { transform: 'translateX(-7.5px)' };

  if (!displayText)
    return (
      <div css={[tw`h-[51px] shadow-md bg-white`, tw`sm:block sm:h-fit`, baseClassName]} style={baseStyles}>
        <div css={[tw`flex-1 flex-shrink-0 text-sm`, tw`sm:text-[11px] sm:px-4 sm:py-1`, tw`truncate`]}>
          {showingRange.from} - {showingRange.to} of {showingRange.total} matches
        </div>
        {toolbarRight}
      </div>
    );

  return (
    <div
      css={[
        tw`h-[70px] border-0 border-b border-solid border-gray shadow-sm bg-gray-light-3`,
        tw`sm:bg-white sm:block sm:h-fit`,
        baseClassName,
      ]}
      style={baseStyles}>
      <h1 tw='sm:text-[17px] sm:px-2 flex-1 flex-shrink-0 my-0'>{displayText}</h1>
      {toolbarRight}
    </div>
  );
};
