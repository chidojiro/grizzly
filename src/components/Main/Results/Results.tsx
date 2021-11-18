import { useSearch } from 'hooks';
import { Item } from './Item';

export const Results = () => {
  const { data } = useSearch();

  if (!data) return null;

  return (
    <div>
      <div className='tw-grid tw-grid-cols-5 tw-pl-7.5'>
        {data?.searchResponse?.results?.map(({ values }) => (
          <Item data={values} key={values.id.single} />
        ))}
      </div>
    </div>
  );
};
