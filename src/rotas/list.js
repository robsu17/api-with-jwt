import { prisma } from "../prisma/prisma.js";

export async function list(request, reply) {
  try {
    const users = await prisma.user.findMany();
    reply.status(200).send(users);
  } catch (err) {
    reply.code(401).send({ error: "Token Expirado!" });
  }
  reply.status(500).send();
}
