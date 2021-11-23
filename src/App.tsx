import { Form, Main } from 'components';
import { SearchParamsProvider } from 'provider';
import { useForm } from 'react-hook-form';
import tw from 'twin.macro';

function App() {
  const methods = useForm({ defaultValues: { filters: {} } });

  return (
    <Form methods={methods} css={[tw`z-0 max-w-full`]}>
      <SearchParamsProvider>
        <Main />
      </SearchParamsProvider>
    </Form>
  );
}

export default App;
