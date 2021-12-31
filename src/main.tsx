import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import FullPageLoading from '@/components/full-page-loading';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<FullPageLoading />}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
