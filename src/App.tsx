import { Header, Main } from 'components';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  );
}

export default App;
