import { register } from "./rotas/register.js";
import { list } from "./rotas/list.js";
import { login } from "./rotas/login.js";
import { verifiyToken } from "./middleware/index.js";
import { message } from "./rotas/message.js";
import { listmessages } from "./rotas/listmessages.js";

export async function Routes(app) {
  app.get("/list", list);
  app.get("/list/messages", { preHandler: verifiyToken }, listmessages);
  app.post("/list/messages", { preHandler: verifiyToken }, message);
  app.post("/login", login);
  app.post("/register", register);
}
