import { useSearch } from 'hooks';
import { Item } from './Item';
import tw from 'twin.macro';

export const Results = () => {
  const { data } = useSearch();

  if (!data) return null;

  return (
    <div>
      <div css={[tw`grid grid-cols-5 pl-7.5 sm:grid-cols-1 md:pl-0`]}>
        {data?.results?.map(({ values, token }) => (
          <Item data={values as any} key={(values as any).id} posNegToken={token} />
        ))}
      </div>
    </div>
  );
};
