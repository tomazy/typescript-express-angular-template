import * as express from 'express';
import * as path from 'path';
import * as helmet from 'helmet';
import * as responseTime from 'response-time';
import * as compression from 'compression';
import * as serveStatic from 'serve-static';
import * as errorHandler from 'express-error-handler';
import * as bodyParser from 'body-parser';

import {middleware as db} from './db';
import cors from './cors';

const log = require('./logger')('app');

const app = express();
app.use(responseTime());
app.use(log.requestLogger());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

app.use(serveStatic(path.resolve(__dirname, '../wwwroot'), {
  maxAge: '1y',
  setHeaders: setCustomCacheControl,
}));

app.use(db);
app.use('/api', cors, require('./todos/router').default);

app.get('/_heartbeat', (req, res) => {
  res.sendStatus(204);
});

app.get('/_error', (req, res, next) => {
  // to test if our server gracefully restarts
  throw new Error('sample error 2');
});

app.all('/*', errorHandler.httpError(404));

app.use(log.errorLogger());

export default app;

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}
