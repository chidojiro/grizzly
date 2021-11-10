import { useControllable } from 'hooks';
import React from 'react';

export interface PaginationItem {
  type: 'page' | 'next' | 'previous' | 'ellipsis';
  onClick?: React.ReactEventHandler;
  page?: number;
  selected?: boolean;
  disabled?: boolean;
}

export type Props = {
  page?: number;
  totalRecord: number;
  perPage?: number;
  onChange?: (page: number) => void;
  pageRange?: number;
  pageEndpointRange?: number;
};

type UsePaginationReturn = {
  items: PaginationItem[];
};

export const usePagination = ({
  page: pageProp,
  totalRecord,
  perPage = 15,
  onChange,
  pageRange = 3,
  pageEndpointRange: pageEndpointRangeProp = 5,
}: Props): UsePaginationReturn => {
  const [page, setPage] = useControllable({ value: pageProp, onChange, defaultValue: 1 });

  const pageEndpointRange = Math.max(pageEndpointRangeProp, pageRange);

  const totalPage = Math.ceil(totalRecord / perPage);

  const resolveShowingRange = () => {
    const numberToRange = (num: number, offset = 0) => {
      return new Array(num).fill(null).map((_, idx) => idx + 1 + offset);
    };

    if (totalPage <= pageEndpointRange + 1) return numberToRange(totalPage);

    if (page >= pageEndpointRange && page <= totalPage - pageEndpointRange + 1)
      return numberToRange(pageRange, page - Math.floor(pageRange / 2) - 1);

    if (page < pageEndpointRange) return numberToRange(pageEndpointRange);

    if (page > totalPage - pageEndpointRange + 1)
      return numberToRange(pageEndpointRange, totalPage - pageEndpointRange);

    return numberToRange(totalPage);
  };

  const showingRange = resolveShowingRange();

  const next = React.useCallback(() => {
    setPage(Math.min(page + 1, totalPage));
  }, [page, setPage, totalPage]);

  const prev = React.useCallback(() => {
    setPage(Math.max(page - 1, 1));
  }, [page, setPage]);

  const clickPage = React.useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage]
  );

  const nextItem = React.useMemo<PaginationItem>(
    () => ({
      type: 'next',
      onClick: next,
      disabled: page === totalPage,
    }),
    [next, page, totalPage]
  );

  const prevItem = React.useMemo<PaginationItem>(
    () => ({
      type: 'previous',
      onClick: prev,
      disabled: page === 1,
    }),
    [page, prev]
  );

  const ellipsisItem = React.useMemo<PaginationItem>(
    () => ({
      type: 'ellipsis',
    }),
    []
  );

  const firstPageItem = React.useMemo<PaginationItem>(
    () => ({
      type: 'page',
      page: 1,
      onClick: () => clickPage(1),
    }),
    [clickPage]
  );

  const lastPageItem = React.useMemo<PaginationItem>(
    () => ({
      type: 'page',
      page: totalPage,
      onClick: () => clickPage(totalPage),
    }),
    [clickPage, totalPage]
  );

  const showingRangeItems = React.useMemo<PaginationItem[]>(
    () =>
      showingRange.map(showingPage => ({
        type: 'page',
        page: showingPage,
        selected: showingPage === page,
        onClick: () => clickPage(showingPage),
      })),
    [clickPage, page, showingRange]
  );

  const returnValue = React.useMemo(
    () => ({
      items: [
        prevItem,
        showingRange[0] !== 1 && [firstPageItem, ellipsisItem],
        showingRangeItems,
        showingRange[showingRange.length - 1] !== totalPage && [ellipsisItem, lastPageItem],
        nextItem,
      ]
        .flat()
        .filter((item): item is PaginationItem => !!item),
    }),
    [ellipsisItem, firstPageItem, lastPageItem, nextItem, prevItem, showingRange, showingRangeItems, totalPage]
  );

  return returnValue;
};
