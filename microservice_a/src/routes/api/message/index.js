import express from 'express'
import * as rabbitmq from '../../../utils/queues/rabbitmq.js'
import { v4 as uuid } from 'uuid'

export const router = express.Router()


router.post('/api/message', (req, res) => {
	const message = uuid()
	console.log(`Creating task id ${message}.`)

	// Send the message to the queue
	console.log(`Publishing task id ${message} to queue with routing key 'task_queue'.`)
	const isSent = rabbitmq.channel.publish('', 'task_queue', Buffer.from(message), {
		persistent: true
	})

	// Check for errors
	if (!isSent) {
		console.error(`Unable to publish task id ${message} to queue with routing key 'task_queue'.`)
		res.status(500).send('Unable to process the data.')
	}

	// Respond to client
	console.log(`Successfully published task id ${message} to queue with routing key 'task_queue'.`)
	res.status(201).send('We are now processing the data.')
})