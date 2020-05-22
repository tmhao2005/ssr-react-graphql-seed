import { RESTDataSource } from "apollo-datasource-rest";

export class GitAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = GAI_API;
  }

  async search(query: string) {
    return this.get(`/escort/products?${query}`);
  }

  async getOne(id: number) {
    return this.get(`/escort/products/${id}`);
  }
}
