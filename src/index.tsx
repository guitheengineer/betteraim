import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'context';
import { StrictMode } from 'react';

ReactDOM.render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
