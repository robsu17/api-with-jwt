import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../prisma/prisma.js";

export async function register(request, reply) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerSchema.parse(request.body);

  const findUniqueEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (findUniqueEmail) {
    reply.status(401).send({ msg: "Já existe um usuário com esse email!" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: (await bcrypt.hash(password, 6)).toString(),
      },
    });
    reply.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
  reply.status(500).send();
}
