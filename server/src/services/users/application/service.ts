import { Inject, Service } from "typedi";

// Service 데코레이터를 통해 Container에 등록시킬수 있다.
@Service()
export class UserService {
  constructor(@Inject("txId") private txId: string) {
    console.log("user service가 생성됐다.", txId);
  }

  say(message: string) {
    return `${message} - ${this.txId}`;
  }
}
