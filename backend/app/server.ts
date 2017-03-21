import * as bole from 'bole'

import config from './config'
import app from './index'

bole.output({
  level: 'debug',
  stream: process.stdout,
})
const log = bole('server')

log.info('server process starting')
log.info('config', config)

// Note that there's not much logic in this file.
// The server should be mostly "glue" code to set things up and
// then start listening
app.listen(config.express.port, config.express.ip, error => {
  if (error) {
    log.error('Unable to listen for connections', error)
    process.exit(10)
  }
  log.info(`listening on http://${config.express.ip}:${config.express.port}`)
})
