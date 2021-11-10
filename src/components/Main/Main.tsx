import { Form, Pagination } from 'components';
import { useForm } from 'react-hook-form';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { Results } from './Results';
import { useQuery } from 'hooks';

export const Main = () => {
  const methods = useForm();

  const query = useQuery();

  const pageQuery = query.get('p');

  const page = pageQuery ? +pageQuery : 1;
  const handlePageChange = (page: number) => {
    query.set('p', page);
  };

  return (
    <Form methods={methods} className='z-0 max-w-full'>
      <Toolbar />
      <div className='flex pt-3'>
        <Sidebar />
        <Results />
      </div>
      <Pagination totalRecord={100} perPage={25} onChange={handlePageChange} page={page} />
    </Form>
  );
};
