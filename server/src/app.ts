import Koa from "koa";
import "reflect-metadata";
import Container from "typedi";
import { UserService } from "./services/users/application/service";

const app = new Koa();

app.use(async (ctx, next) => {
  const fakeUuid = `uuid-${Math.floor(Math.random() * 1000000)}`;

  const container = Container.of(fakeUuid); // context 별로 격리된 컨테이너를 만들어 사용할 수 있다.
  ctx.state.container = container; // ctx.state는 koa가 관리해주는 context에서 자유롭게 사용할 수 있는 변수

  container.set("txId", fakeUuid);

  await next();
});

app.use(async (ctx) => {
  const service = ctx.state.container.get(UserService); // 처음 컨테이너를 얻어올 때 컨테이너에 없으면 만들고, 있으면 그대로 다시 얻어온다.

  ctx.body = service.say("Hi!!");
});

export default app;
