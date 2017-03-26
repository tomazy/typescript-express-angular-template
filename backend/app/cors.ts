import * as cors from 'cors'
import config from './config'

const { production } = config;

const whitelist = production
  ? []
  : ['http://localhost:4200']

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // the call comes from the same origin as the server
      callback(null, true)
    }
    else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else if (!production && origin.match(/localhost/)) {
      // e2e tests run on random ports
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

export default cors(corsOptions)
