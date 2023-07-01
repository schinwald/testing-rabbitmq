import express from 'express'
import * as rabbitmq from './utils/queues/rabbitmq.js'

process.on('exit', () => {
	rabbitmq.connection.close()
})

const port = 8002
const app = express()

rabbitmq.channel.consume('task_queue', (message) => {
	console.log(`Consuming task id ${message.content} from queue with routing key 'task_queue'.`)
	rabbitmq.channel.ack(message)
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
