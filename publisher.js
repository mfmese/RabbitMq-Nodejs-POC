const amqp = require("amqplib");

const queueName = process.argv[2] || "jobsQueue"; // eğer parametre boş gelirse "jobsQueue" değerini ata

const message = {
  description: "Bu bir test mesajıdır...",
};

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = channel.assertQueue(queueName);

    setInterval(() => {
      message.description = new Date().getTime();
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log("Gönderilen mesaj", message);
    }, 10);
  } catch (error) {
    console.log("Error", error);
  }
}
