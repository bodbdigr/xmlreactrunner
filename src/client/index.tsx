import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../common/App';
import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

declare const module: any;

if (module.hot) {
    module.hot.accept('../common/App', () => {
        ReactDOM.render(
          <AppContainer>
            <App />
          </AppContainer>,
          document.getElementById('root') as HTMLElement
        )
    })
}
