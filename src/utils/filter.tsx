import { filterFields, singeFields } from 'consts';

const OR = ' OR ';
const AND = ' AND ';

const isSimpleQ = (q: string) => {
  return [' OR ', ' AND ', ':', '(', ')'].every(keyword => !q.includes(keyword));
};

const buildFilter = (field: string, value: string) => {
  return singeFields.includes(field) ? `(${field} ~ "${value}")` : `(${field} ~ ["${value}"])`;
};

const buildFilterFromLuceneQueries = (_queryString: string) => {
  if (!_queryString) return { q: '', filter: '' };

  if (isSimpleQ(_queryString)) return { q: _queryString, filter: '' };

  let q = '';
  let filter = '';

  const buildLuceneQuerySegment = (fragment: string): string => {
    if (fragment.includes(OR)) {
      const parts = fragment.split(OR);

      return `(${parts
        .map(part => buildLuceneQuerySegment(part))
        .filter(Boolean)
        .join(OR)})`;
    }

    if (fragment.includes(AND)) {
      const parts = fragment.split(AND);

      return `(${parts
        .map(part => buildLuceneQuerySegment(part))
        .filter(Boolean)
        .join(AND)})`;
    }

    if (!fragment.includes(':')) {
      if (!q && !filter) {
        q = fragment;
      }
      return '(title ~ "")';
    }

    const [_key, value] = fragment.split(':');
    const key = _key === 'category' ? 'filtercats' : _key;

    return buildFilter(key, value);
  };

  const queryString = _queryString.replaceAll('%26', '&').replaceAll(/["']/g, '');

  if ([OR, AND].some(op => _queryString.includes(op)) && ['(', ')'].every(op => !_queryString.includes(op))) {
    const filter = buildLuceneQuerySegment(_queryString);
    return { q, filter };
  }

  let openParenthesesIndex = -1;

  for (let i = 0; i < queryString.length; i++) {
    const character = queryString[i];

    const hasOpenParentheses = openParenthesesIndex !== -1;

    if (character === '(') {
      if (hasOpenParentheses) {
        filter += character;
      }
      openParenthesesIndex = i;
    } else if (character === ')' && hasOpenParentheses) {
      const closeParenthesesIndex = i;
      const nextFilterSegment = buildLuceneQuerySegment(
        queryString.slice(openParenthesesIndex + 1, closeParenthesesIndex)
      );
      filter += nextFilterSegment;
      openParenthesesIndex = -1;
    } else if (!hasOpenParentheses) {
      filter += character;
    }
  }

  console.log(filter);

  return { filter: filter ? `(${filter.replaceAll(/(\sAND\s|\sOR\s)\(\)/g, '')})` : '', q };
};

const countQueries = filterFields.map(({ name }) => name);
const buildCountFilters = (filters: Record<string, string[]>) => {
  const filterQueries = countQueries.reduce<string[]>((acc, curField) => {
    const fieldFilterQueries =
      filters[curField === 'filtercats' ? 'category' : curField]?.map((option: string) => {
        return buildFilter(curField, option);
      }) || [];

    return [...acc, fieldFilterQueries.join(' OR ')];
  }, []);

  return filterQueries.join(',');
};

const buildPriceFilter = (selectedPriceFilters: string[]) => {
  if (!selectedPriceFilters?.length) return '';

  return `(${selectedPriceFilters
    .reduce<string[]>((acc, cur) => {
      const [from, to] = cur.replaceAll(/[[\]]/g, '').split(' TO ');

      if (to === '*') return [...acc, `(price >= ${from})`];

      return [...acc, `(price >= ${from} AND price < ${to})`];
    }, [])
    .join(' OR ')})`;
};

const FilterUtils = {
  buildCountFilters,
  buildPriceFilter,
  buildFilterFromLuceneQueries,
  isSimpleQ,
};

export default FilterUtils;
