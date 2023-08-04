import fastify from "fastify";
import { Routes } from "./routes.js";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { env } from "./env/index.js";

export const app = fastify();

app.register(Routes);
app.register(cookie);

app.register(jwt, {
  secret: env.SECRET_KEY,
});
