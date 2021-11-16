import { Search } from 'components';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false }}></SWRConfig>
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('site-search')
);

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
  document.querySelector('main')
);
