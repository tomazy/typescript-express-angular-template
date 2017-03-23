import * as cors from 'cors'
import config from './config'

const whitelist = config.production
  ? []
  : ['http://localhost:4200']

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

export default cors(corsOptions)
