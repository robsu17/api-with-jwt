import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../prisma/prisma.js";
import { app } from "../app.js";

export async function login(request, reply) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = loginSchema.parse(request.body);

  try {
    const users = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!users) {
      reply.status(401).send({ msg: "Usuário não está cadastrado!" });
      return;
    }

    const passwordTrueOrFalse = await bcrypt.compare(
      password,
      users.password_hash,
    );

    let tokenCookie = request.cookies.token;
    if (tokenCookie) {
      reply.status(401).send({ msg: "Usuário já está logado!" });
      return;
    }

    const { id, name } = users;

    if (passwordTrueOrFalse) {
      tokenCookie = app.jwt.sign({ id, name }, { expiresIn: "1h" });
      reply.setCookie("token", tokenCookie, {
        path: "/",
        httpsOnly: true,
      });
      reply.status(200).send({ msg: "Usuário logado!" });
    }

    reply.status(401).send({ msg: "Usuário ou senha errados!" });
  } catch (err) {
    console.log(err);
  }

  reply.status(500).send();
}
