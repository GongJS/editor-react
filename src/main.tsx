import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import FullPageLoading from '@/components/full-page-loading';
import FullPageErrorFallback from '@/components/full-page-error-fallback';
import App from './App';
import './index.css';

const errorHandler = (error: Error, info: { componentStack: string }) => {
  // Todo
  console.log('error:', error, 'info:', info);
};

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={FullPageErrorFallback} onError={errorHandler}>
      <React.Suspense fallback={<FullPageLoading />}>
        <RecoilRoot>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecoilRoot>
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
