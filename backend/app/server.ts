import * as http from 'http';
import * as errorHandler from 'express-error-handler';

import { connect } from './db';
import config from './config';
import app from './index';

const log = require('./logger')('server');

log.info('server process starting');
log.info('config:', config);

// Create the server object that we can pass
// in to the error handler:
const server = http.createServer(app);

// Respond to errors and conditionally shut
// down the server. Pass in the server object
// so the error handler can shut it down
// gracefully:
app.use(errorHandler({ server }));

// Note that there's not much logic in this file.
// The server should be mostly "glue" code to set things up and
// then start listening
connect().then(() => {
  server.listen(config.express.port, config.express.ip, error => {
    if (error) {
      log.error('Unable to listen for connections', error);
      process.exit(10);
    }
    log.info(`listening on http://${config.express.ip}:${config.express.port}`);
  });
});
