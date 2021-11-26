import { Client, PosNegLocalStorageManager, PosNegToken, SearchResponse, Tracking } from '@sajari/sdk-js/dist/index';
import { Price } from 'components/Main/Results/Item/Price';
import { defaultTracking } from 'consts';
import { FilterInfo, SearchAutocompleteRequestValues, SearchQueryRequestValues } from 'types';

const collection = 'grizzly';
const project = '1623269058042651642';

const client = new Client(project, collection);
const queryPipeline = client.pipeline('query');
const autocompletePipeline = client.pipeline('autocomplete');
const posNegStorage = new PosNegLocalStorageManager(client);

const get = (
  values: SearchQueryRequestValues,
  tracking: Tracking
): Promise<[SearchResponse, Record<string, string>]> => {
  return queryPipeline.search(values, tracking);
};

const getSuggestions = (values: SearchAutocompleteRequestValues): Promise<any> => {
  return autocompletePipeline.search(values, defaultTracking).then(data => data[1]);
};

const getPriceFilterInfo = async (values: SearchQueryRequestValues) => {
  const data = await get(values, defaultTracking);

  const buckets = data[0].aggregateFilters?.buckets?.count as any;

  if (!buckets)
    return {
      label: 'Price',
      name: 'price',
      options: [],
    } as FilterInfo;

  const ranges = Object.keys(buckets)
    .map(key => {
      if (!buckets[key]) return [];
      const [, rangeString] = key.split('_');

      return rangeString.split('-');
    })
    .filter(v => v.length)
    .sort((a, b) => +a[0] - +b[0]);

  const options = ranges.map(range => {
    const [from, to] = range;

    return {
      label: (
        <span>
          <Price price={+from} />
          {to === '*' ? (
            '+'
          ) : (
            <span>
              {' '}
              to <Price price={+to} />
            </span>
          )}
        </span>
      ),
      value: `[${from.includes('.') ? from : from + '.00'} TO ${to}]`,
    };
  });

  return {
    label: 'Price',
    name: 'price',
    options,
  } as FilterInfo;
};

const sendClickEvent = (posToken: PosNegToken) => {
  posNegStorage.add('id', posToken);
  return posNegStorage.sendClickEvent('id');
};

export const SearchApis = { get, getSuggestions, getPriceFilterInfo, sendClickEvent };
