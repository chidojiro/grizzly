import { Form } from 'components';
import { useForm } from 'react-hook-form';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';

export const Main = () => {
  const methods = useForm();

  return (
    <Form methods={methods} className='z-0'>
      <Toolbar />
      <div className='px-2 pt-4'>
        <Sidebar />
      </div>
    </Form>
  );
};
