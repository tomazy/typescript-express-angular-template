import * as express from 'express';
import * as path from 'path';
import * as helmet from 'helmet';
import * as responseTime from 'response-time';
import * as compression from 'compression';
import * as serveStatic from 'serve-static';

import cors from './cors';

const app = express();
app.use(compression());
app.use(responseTime());
app.use(helmet());

app.use(serveStatic(path.resolve(__dirname, '../wwwroot'), {
  maxAge: '1y',
  setHeaders: setCustomCacheControl,
}));

app.use('/api', cors, require('./todos/router').default);

app.get('/_heartbeat', (req, res) => {
  res.sendStatus(204);
});

export default app;

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}
