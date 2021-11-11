import { Form, Main } from 'components';
import { useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';

function App() {
  const methods = useForm();

  return (
    <BrowserRouter>
      <Form methods={methods} className='tw-z-0 tw-max-w-full'>
        <Main />
      </Form>
    </BrowserRouter>
  );
}

export default App;
