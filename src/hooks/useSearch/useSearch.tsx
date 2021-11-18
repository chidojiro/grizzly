import { SearchApis } from 'apis';
import { categorySegments, filterFields, metadata } from 'consts';
import { useSearchParams } from 'hooks';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { SearchQueryRequestPayload, FilterInfo } from 'types';

const countQueries = filterFields.map(({ name }) => name);

export const useSearch = () => {
  const { page, perPage, sortBy, q, hasSelectedFilter } = useSearchParams();
  const isSimpleQ = !q.startsWith('(') && !q.endsWith(')');
  const _q = q.replaceAll(/[()"]/g, '').replace('category', 'category1');

  const destructQ = () => {
    if (isSimpleQ) return {};

    return _q.split(' AND ').reduce<{ [key: string]: string[] }>((acc, cur) => {
      const [key, value] = cur.split(':');

      acc[key] = (acc[key] || []).concat(value.split(' OR '));

      return acc;
    }, {});
  };

  const count = countQueries.join(',');

  const { watch } = useFormContext();

  const filters = watch('filters');

  const filtersGetFromQ = destructQ();
  const combinedFilters = countQueries.reduce<{ [key: string]: string[] }>((acc, cur) => {
    if (categorySegments.includes(cur))
      return { ...acc, category: [filters.category || [], filtersGetFromQ.category || []].flat() };

    return { ...acc, [cur]: [filters[cur] || [], filtersGetFromQ[cur] || []].flat() };
  }, {});

  const filterQueries = countQueries.reduce<string[]>((acc, curField) => {
    if (curField === 'category1') {
      const categoryOptions = combinedFilters.category;

      return [
        ...acc,
        categoryOptions
          .reduce<string[]>(
            (accCategoryQueries, curCategoryQueries) => [
              ...accCategoryQueries,
              categorySegments.map(segment => `(${segment} = "${curCategoryQueries}")`).join(' OR '),
            ],
            []
          )
          .join(' OR '),
      ];
    } else if (categorySegments.includes(curField)) return [...acc, ''];

    const fieldFilterQueries =
      combinedFilters[curField]?.map((option: string) => {
        const foundFilterField = filterFields.find(({ name }) => name === curField);

        return foundFilterField?.single ? `(${curField} = "${option}")` : `(${curField} ~ ["${option}"])`;
      }) || [];

    return [...acc, fieldFilterQueries.join(' OR ')];
  }, []);

  const filterQuery = filterQueries.join(',');

  const payload: SearchQueryRequestPayload = React.useMemo(
    () => ({
      metadata: metadata,
      request: {
        tracking: {
          query_id: '0kqlxq2a8jm6wq6s',
          type: 'NONE',
          sequence: 0,
          field: '_id',
          data: {
            ga: 'GA1.1.1132377212.1636510238',
            ' _ga': 'GA1.1.1132377212.1636510238',
            ' _ga_V9SMSCPSQY': 'GS1.1.1636706577.7.1.1636707843.0',
          },
        },
        pipeline: { name: 'query' },
        values: {
          fields: '',
          q: isSimpleQ ? q : '',
          resultsPerPage: perPage.toString(),
          sortBy: sortBy,
          page: page.toString(),
          buckets: '',
          count: count,
          countFilters: filterQuery,
          filter: '(price >= 1264 AND price <= 5000000)',
          max: 'price',
          min: 'price',
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, filterQuery, page, perPage, q, sortBy]
  );

  const swrReturn = useSWR(['/search', JSON.stringify(payload)], () => SearchApis.get(payload));

  const aggregateFilters = swrReturn.data?.searchResponse?.aggregateFilters || {};

  const filtersInfo = Object.keys(aggregateFilters).reduce<FilterInfo[]>((acc, curField) => {
    const [type, field] = curField.split('.');

    if (type !== 'count' || _q.includes(field) || field === 'altcategory') return acc;

    const options = Object.keys(aggregateFilters[curField].count.counts || {})
      .filter(Boolean)
      .map(option => ({ label: option.replaceAll(' in.', '"'), value: option }))
      .filter(Boolean);

    if (['category1', 'category2', 'category3', 'category4', 'category5', 'category6', 'category7'].includes(field)) {
      const foundAccumulatedCategory = acc.find(({ name }) => name === 'category');

      if (!foundAccumulatedCategory)
        return [
          ...acc,
          {
            name: 'category',
            label: 'Category',
            single: true,
            options,
          },
        ];

      const accumulatedCategoryOptions = acc.find(({ name }) => name === 'category')?.options || [];

      Object.assign(foundAccumulatedCategory, {
        options: Array.from(new Set([accumulatedCategoryOptions, options].flat())),
      });

      return acc;
    }

    if (!hasSelectedFilter(field) && options.length < 2) return acc;

    return [
      ...acc,
      {
        ...filterFields.find(({ name }) => name === field),
        options,
      },
    ] as FilterInfo[];
  }, []);

  const returnValue = React.useMemo(() => ({ ...swrReturn, filtersInfo }), [filtersInfo, swrReturn]);

  return returnValue;
};
