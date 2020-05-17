import { RESTDataSource } from "apollo-datasource-rest";

export class GitAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.github.com";
  }

  async search(query: string) {
    return this.get(`/search/users?q=${query}`);
  }
}
