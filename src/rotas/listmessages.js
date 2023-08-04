import { prisma } from "../prisma/prisma.js";

export async function listmessages(request, reply) {
  try {
    console.log(request);
    const messages = await prisma.messages.findMany({
      where: {
        userId: request.user.id,
      },
    });

    reply.status(200).send(messages);
  } catch (err) {
    console.log(err);
  }
}
