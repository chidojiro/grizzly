import { filterFields } from 'consts';
export const isSimpleQ = (q: string) => !q.startsWith('(') && !q.endsWith(')');

export const convertQToFilters = (q: string) => {
  const _q = q.replaceAll(/[()"]/g, '');

  if (isSimpleQ(_q)) return {};

  return q.split(' AND ').reduce<{ [key: string]: string[] }>((acc, cur) => {
    const [key, value] = cur.split(':');

    acc[key] = (acc[key] || []).concat(value.split(' OR '));

    return acc;
  }, {});
};

const countQueries = filterFields.map(({ name }) => name);
export const combineFilters = (q: string, filters: Record<string, string[]>) => {
  const filtersGetFromQ = convertQToFilters(q);

  const combinedFilters = countQueries.reduce<{ [key: string]: string[] }>((acc, cur) => {
    return { ...acc, [cur]: [filters[cur] || [], filtersGetFromQ[cur] || []].flat() };
  }, {});

  const filterQueries = countQueries.reduce<string[]>((acc, curField) => {
    const fieldFilterQueries =
      combinedFilters[curField]?.map((option: string) => {
        const foundFilterField = filterFields.find(({ name }) => name === curField);

        return foundFilterField?.single ? `(${curField} = "${option}")` : `(${curField} ~ ["${option}"])`;
      }) || [];

    return [...acc, fieldFilterQueries.join(' OR ')];
  }, []);

  return filterQueries.join(',');
};
