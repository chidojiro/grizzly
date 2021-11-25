import { Search } from 'components';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import App from './App';
import { Global, css } from '@emotion/react';

const MyGlobalStyles = () => {
  return (
    <Global
      styles={css`
        main {
          box-sizing: border-box;
          font-family: avantgarde_normalbook;
        }

        main a {
          text-decoration: none;

          :hover {
            color: #212529;
          }
        }

        .zero-results-categories a,
        #site-search a {
          color: #1e94b6;

          :hover {
            text-decoration: underline;
          }
        }

        .minimized {
          height: 0;
          width: 0;
          border: none;
          outline: none;
          margin: 0;
          padding: 0;
          position: absolute;
        }
      `}></Global>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false }}></SWRConfig>
    <BrowserRouter>
      <MyGlobalStyles />
      <Search />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('site-search')
);

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false }}>
      <BrowserRouter>
        <MyGlobalStyles />
        <App />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
  document.querySelector('main')
);
