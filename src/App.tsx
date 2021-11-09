import { Header } from 'components';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
