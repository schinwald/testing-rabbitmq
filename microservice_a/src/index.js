import express from 'express'
import * as rabbitmq from './utils/queues/rabbitmq.js'
import { router } from './routes/api/message/index.js'

process.on('exit', () => {
	rabbitmq.connection.close()
})

const port = 8001
const app = express()

app.use(router)

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
