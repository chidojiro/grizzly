import { useSearch } from 'hooks';
import { Item } from './Item';
import tw from 'twin.macro';

export const Results = () => {
  const { data } = useSearch();

  if (!data) return null;

  return (
    <div>
      <div css={[tw`grid grid-cols-5 pl-7.5`]}>
        {data?.searchResponse?.results?.map(({ values }) => (
          <Item data={values} key={values.id.single} />
        ))}
      </div>
    </div>
  );
};
