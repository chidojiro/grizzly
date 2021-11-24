type BaseSearchValues = {
  q: string;
  resultsPerPage: string;
  fields: string;
};

export type Metadata = {
  collection: string[];
  project: string[];
  'user-agent': string[];
};

export type Tracking = {
  type: string;
  query_id: string;
  sequence: number;
  field: string;
};

export type FieldOfSingleValue = {
  single: string;
};

export type FieldOfRepeatedValue = {
  repeated: { values: string[] };
};

export type SearchResult = {
  indexScore: number;
  score: number;
  values: {
    id: FieldOfSingleValue;
    url: FieldOfSingleValue;
    title: FieldOfSingleValue;
    image: FieldOfSingleValue;
    isnew: FieldOfSingleValue;
    freight: FieldOfSingleValue;
    freightcost_usa: FieldOfSingleValue;
    outlet: FieldOfSingleValue;
    instock: FieldOfSingleValue;
    onspecial: FieldOfSingleValue;
    price: FieldOfSingleValue;
    catalogprice: FieldOfSingleValue;
    quantityavailable: FieldOfSingleValue;
    [key: string]: FieldOfRepeatedValue | FieldOfSingleValue;
  };
};

export type SearchQueryRequestPayload = {
  metadata: Metadata;
  request: {
    pipeline: {
      name: 'query';
    };
    tracking?: any;
    values: BaseSearchValues & {
      count?: string;
      countFilters?: string;
      filter?: string;
      buckets?: string;
      min?: string;
      max?: string;
      sortBy?: string;
      page: string;
    };
  };
};

export type SearchAutoCompleteRequestPayload = {
  metadata: Metadata;
  request: {
    pipeline: {
      name: 'autocomplete';
    };
    tracking?: any;
    values: BaseSearchValues;
  };
};

type AggregateFilter = {
  count: {
    counts: {
      [key: string]: number;
    };
  };
};

export type SearchQueryResponsePayload = {
  searchResponse: {
    aggregateFilters: {
      [key: string]: AggregateFilter;
    };
    time: string;
    totalResults: string;
    results: SearchResult[];
  };
};

export type SearchAutoCompleteResponsePayload = {
  values: {
    'q.original': string;
    'q.suggestions': string;
  };
};
