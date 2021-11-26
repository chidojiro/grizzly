type BaseSearchValues = {
  q: string;
  resultsPerPage: string;
  fields: string;
};

export type SearchResult = {
  indexScore: number;
  score: number;
  values: {
    id: string;
    url: string;
    title: string;
    image: string;
    isnew: string;
    freight: string;
    freightcost_usa: string;
    outlet: string;
    instock: string;
    onspecial: string;
    price: string;
    catalogprice: string;
    quantityavailable: string;
    [key: string]: string | string[];
  };
};

export type SearchQueryRequestValues = BaseSearchValues & {
  count?: string;
  countFilters?: string;
  filter?: string;
  buckets?: string;
  min?: string;
  max?: string;
  sortBy?: string;
  page: string;
};

export type SearchAutocompleteRequestValues = BaseSearchValues;
