import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// All styles from platform-ui (fonts, CSS, tokens)
import '@xala-technologies/platform-ui/styles';
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
