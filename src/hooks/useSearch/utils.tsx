import { filterAliases, filterFields } from 'consts';
export const isSimpleQ = (q: string) => !q.startsWith('(') && !q.endsWith(')');

export const convertQToFilters = (q: string) => {
  if (isSimpleQ(q)) return {};

  const _q = q.replaceAll('(category', '(category1').replaceAll(/[()"]/g, '');

  return _q
    .split(' AND ')
    .map(frag => frag.split(' OR '))
    .flat()
    .reduce<{ [key: string]: string[] }>((acc, cur) => {
      const [key, value] = cur.split(':');

      acc[key] = (acc[key] || []).concat(value.split(' OR '));

      return acc;
    }, {});
};

const countQueries = filterFields.map(({ name }) => name);
export const combineFilters = (q: string, filters: Record<string, string[]>) => {
  const filtersGetFromQ = convertQToFilters(q);

  const combinedFilters = countQueries.reduce<{ [key: string]: string[] }>((acc, curField) => {
    const curFieldAlias = filterAliases[curField as any];

    return {
      ...acc,
      [curField]: [filters[curFieldAlias || curField] || [], filtersGetFromQ[curFieldAlias || curField] || []].flat(),
    };
  }, {});

  const filterQueries = countQueries.reduce<string[]>((acc, curField) => {
    const fieldFilterQueries =
      combinedFilters[curField]?.map((option: string) => {
        const foundFilterField = filterFields.find(({ name }) => name === curField);
        return foundFilterField?.single
          ? `(${foundFilterField?.name} = "${option}")`
          : `(${foundFilterField?.name} ~ ["${option}"])`;
      }) || [];

    return [...acc, fieldFilterQueries.join(' OR ')];
  }, []);

  return filterQueries.join(',');
};

export const resolvePriceFilterString = (selectedPriceFilters: string[]) => {
  if (!selectedPriceFilters?.length) return '(price > 0)';

  return selectedPriceFilters
    .reduce<string[]>((acc, cur) => {
      const [from, to] = cur.replaceAll(/[[\]]/g, '').split(' TO ');

      if (to === '*') return [...acc, `(price >= ${from})`];

      return [...acc, `(price >= ${from} AND price < ${to})`];
    }, [])
    .join(' OR ');
};