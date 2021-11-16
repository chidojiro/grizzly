import { Form, Main } from 'components';
import { SearchParamsProvider } from 'provider';
import { useForm } from 'react-hook-form';
import './tailwind.css';

function App() {
  const methods = useForm({ defaultValues: { filters: {} } });

  return (
    <Form methods={methods} className='tw-z-0 tw-max-w-full'>
      <SearchParamsProvider>
        <Main />
      </SearchParamsProvider>
    </Form>
  );
}

export default App;
