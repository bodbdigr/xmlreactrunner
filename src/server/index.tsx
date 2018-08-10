import * as express from 'express';
import * as fs from "fs";
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from '../common/App';

const PORT = 3000;
const app = express();
const router = express.Router();

declare const module: any;

const serverRenderer = (req:express.Request, res:express.Response) => {
  const filePath = path.join('public', 'index.html');
  fs.readFile(filePath, 'utf8', (err:any, htmlData:any) => {
    if (err) {
      console.log('err is', err);
      return res.status(404);
    }

    const html = ReactDOMServer.renderToString(<App />);
    return res.send(
      htmlData.replace('<div id="root"></div>', `
        <div id="root">${html}</div>
        <script src="http://localhost:3001/static/js/bundle.js" defer></script>
      `)
    );
  });
}

router.use(express.static(
    './dist',
    { maxAge: '30d' },
));

router.use('*', serverRenderer);

app.use(router);

const server = app.listen(PORT);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
