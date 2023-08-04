import { app } from "../app.js";
import { env } from "../env/index.js";

export async function verifiyToken(request, reply) {
  const token = request.cookies.token;

  if (!token) {
    return reply.status(401).send({
      error: "Unauthorized",
    });
  }

  app.jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return reply.status(403).send({ msg: "token inválido" });
    }

    request.user = decoded;
  });
}
