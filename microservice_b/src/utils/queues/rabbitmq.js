import amqp from 'amqplib'

// Setup RabbitMQ connection
export const connection = await amqp.connect(process.env.RABBITMQ_URL)
export const channel = await connection.createChannel()