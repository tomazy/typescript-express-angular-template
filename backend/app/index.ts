import * as express from 'express'
import * as path from 'path'
import * as helmet from 'helmet'
import * as responseTime from 'response-time'
import * as compression from 'compression'

const app = express()
app.use(compression())
app.use(responseTime())
app.use(helmet())

app.use(express.static(path.resolve(__dirname, '../wwwroot')))
app.use('/api', require('./todos/router').default)

export default app
