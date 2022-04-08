import Koa from "koa";
import "reflect-metadata";
import Container from "typedi";
import { UserService } from "./services/users/application/service";

const app = new Koa();

app.use(async (ctx) => {
  const service = Container.get(UserService); // 처음 컨테이너를 얻어올 때 컨테이너에 없으면 만들고, 있으면 그대로 다시 얻어온다.

  ctx.body = service.say("Hi!!");
});

export default app;
