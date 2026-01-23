import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@digdir/designsystemet-css';
import { DesignsystemetProvider } from '@xala-technologies/platform-ui';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DesignsystemetProvider theme="custom" colorScheme="light" size="md">
        <App />
      </DesignsystemetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
