import { IUserApi } from "mediator/types/api";
import { IUserMediator } from ".";

export class UserMediator implements IUserMediator {
  private api: IUserApi;

  constructor(api: IUserApi) {
    this.api = api;
  }

  async getUserByEmail(email: string) {
    const res = await this.api.getUserByEmail(email);
    return res;
  }
}
