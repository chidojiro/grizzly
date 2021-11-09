import { Form } from 'components';
import { useForm } from 'react-hook-form';
import { Toolbar } from './Toolbar';

export const Main = () => {
  const methods = useForm();

  return (
    <Form methods={methods} className='z-0'>
      <Toolbar />
    </Form>
  );
};
