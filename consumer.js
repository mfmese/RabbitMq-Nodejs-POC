const amqp = require("amqplib");

const queueName = process.argv[2] || "jobsQueue"; // eğer parametre boş gelirse "jobsQueue" değerini ata

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = channel.assertQueue(queueName);

    //Mesajın alınması
    console.log("Mesaj beklemede...");
    channel.consume(queueName, (message) => {
      console.log("Message", message.content.toString());

      channel.ack(message); //Bu ifade publisher'a bilgiyi aldığına dair bir bilgi döner bu sayede publisher aynı talebi tekrar tekrar bulunmaz.
    });
  } catch (error) {
    console.log("Error", error);
  }
}
