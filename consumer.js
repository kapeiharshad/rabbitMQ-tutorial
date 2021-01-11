const amqp = require("amqplib");

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");

    const channel = await connection.createChannel();

    await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      console.log(message.content.toString());
      channel.ack(message);
    });

    console.log("Waiting for message.");
  } catch (error) {
    console.log(error);
  }
}
