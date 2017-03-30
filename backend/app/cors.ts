import * as cors from 'cors';
import * as createError from 'http-errors';

import config from './config';

const { corsWhitelist, production, ci } = config;
const log = require('./logger')('cors');

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // the call comes from the same origin as the server
      callback(null, true);
    }
    else if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else if ((!production || ci) && origin.match(/localhost/)) {
      // e2e tests run on random ports
      callback(null, true);
    } else {
      log.error(`'${origin}' Not allowed by CORS`);
      callback(new createError.Forbidden());
    }
  },
};

export default cors(corsOptions);
