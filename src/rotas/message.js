import { z } from "zod";
import { prisma } from "../prisma/prisma.js";

export async function message(request, reply) {
  const messageSchema = z.object({
    message: z.string(),
  });

  const { message } = messageSchema.parse(request.body);

  try {
    const newMessage = await prisma.messages.create({
      data: {
        message,
        data: new Date(),
        user: {
          connect: { id: request.user.id },
        },
      },
    });
    reply.status(201).send(newMessage);
  } catch (err) {
    console.log(err);
    reply.status(403).send({ msg: "Erro ao criar a mensagem", err });
  }
}
