import { filterFields, singeFields } from 'consts';

const OR = ' OR ';
const AND = ' AND ';

const buildFilter = (field: string, value: string) => {
  return singeFields.includes(field) ? `${field} ~ "${value}"` : `${field} ~ ["${value}"]`;
};

const _buildFilterFromBaseFilters = (filters: any, operator: 'OR' | 'AND') => {
  return filters.reduce((acc: string, cur: Record<string, any>) => {
    if (cur.hasOwnProperty('OR')) {
      return [acc, '(' + _buildFilterFromBaseFilters(cur.OR, 'OR') + ')'].filter(Boolean).join(operator);
    }

    if (cur.hasOwnProperty('AND')) {
      return [acc, '(' + _buildFilterFromBaseFilters(cur.AND, 'AND') + ')'].filter(Boolean).join(` ${operator} `);
    }
    const field = Object.keys(cur)[0] === 'category' ? 'filtercats' : Object.keys(cur)[0];
    return [acc, buildFilter(field, Object.values(cur)[0])].filter(Boolean).join(` ${operator} `);
  }, '');
};

const buildFilterFromBaseFilters = (filters: Record<string, string>) => {
  if (!filters) return '';

  if (filters.hasOwnProperty('OR')) {
    return `(${_buildFilterFromBaseFilters(filters.OR, 'OR')})`;
  }

  if (filters.hasOwnProperty('AND')) {
    return `(${_buildFilterFromBaseFilters(filters.AND, 'AND')})`;
  }

  return '';
};

const buildFilterFromLuceneQueries = (queryString: string) => {
  if (!queryString) return '';

  if (!queryString.includes('(')) return buildFilter('title', queryString.split(OR)[0]);

  const _queryString = queryString.replaceAll('%26', '&');
  const filterStack: string[] = [];
  let i = 0;
  while (i < _queryString.length) {
    const c = _queryString[i];
    if (c === '(') {
      filterStack.push(c);
      i += 1;
      continue;
    }

    if (_queryString.slice(i).startsWith(OR)) {
      filterStack.push(OR);
      i += OR.length;
      continue;
    }

    if (_queryString.slice(i).startsWith(AND)) {
      filterStack.push(AND);
      i += AND.length;
      continue;
    }

    if (c === ')') {
      const newArgQueue = [];

      while (true) {
        if (!filterStack.length) break;
        const lastArg = filterStack.pop() as string;

        if (lastArg === '(') {
          break;
        }

        newArgQueue.unshift(...lastArg.split(' OR ').filter(Boolean));
      }

      if (!newArgQueue.includes(':') && newArgQueue.every(arg => !['~', '='].includes(arg))) {
        filterStack.push(`(${newArgQueue.map(arg => buildFilter('title', arg).replaceAll('""', '"')).join(OR)})`);
      } else if (newArgQueue.includes(':')) {
        const field = newArgQueue[0] === 'category' ? 'filtercats' : newArgQueue[0];

        const filterQuery = newArgQueue
          .slice(2)
          .filter(val => val !== OR)
          .map(val => buildFilter(field, val).replaceAll('""', '"'))
          .join(' OR ');

        filterStack.push(filterQuery);
      } else {
        filterStack.push(newArgQueue.join(''));
      }

      i += 1;
      continue;
    }

    if (['(', ':'].includes(filterStack[filterStack.length - 1]) || c === ':') {
      filterStack.push(c);
      i += 1;
      continue;
    }

    filterStack[filterStack.length - 1] = filterStack[filterStack.length - 1] + c;
    i += 1;
  }

  return `(${filterStack.join('')})`;
};

const countQueries = filterFields.map(({ name }) => name);
const buildCountFilters = (filters: Record<string, string[]>) => {
  const filterQueries = countQueries.reduce<string[]>((acc, curField) => {
    const fieldFilterQueries =
      filters[curField]?.map((option: string) => {
        if (curField === 'category1') {
          return `(category1 = "${option}") OR (category2 = "${option}") OR (category3 = "${option}") OR (category4 = "${option}") OR (category5 = "${option}") OR (category6 = "${option}") OR (category7 = "${option}")`;
        }

        return buildFilter(curField, option);
      }) || [];

    return [...acc, fieldFilterQueries.join(' OR ')];
  }, []);

  return filterQueries.join(',');
};

const resolvePriceFilterString = (selectedPriceFilters: string[]) => {
  if (!selectedPriceFilters?.length) return '(price > 0)';

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
  resolvePriceFilterString,
  buildFilterFromLuceneQueries,
  buildFilterFromBaseFilters,
};

export default FilterUtils;
