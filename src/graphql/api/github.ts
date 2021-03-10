import { RESTDataSource } from "apollo-datasource-rest";
import {
 Review, User
} from "../../generated/graphql";

export class GitAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = MY_API;
  }

  async search(query: string) {
    return this.get<User[]>(`/escort/products?${query}`);
  }

  async getOne(id: number) {
    return this.get<User>(`/escort/products/${id}`);
  }

  async getReviews(query: string) {
    // entityId=16529&entityType=product&orderBy=latest&page=1&plugin=escort&rpp=10
    return this.get<Review[]>(`escort/reviews?${query}`);
  }

  async getReview(id: string) {
    const res = await this.get<{ data: { review: Review } }>(`escort/reviews/${id}`);

    return res.data.review;
  }

  async getPhotos(userId: number) {
    const user = await this.getOne(userId);
    const reviews = await this.getReviews(`entityId=${user.id}&entityType=product&orderBy=latest&page=1&plugin=escort&rpp=40`);
    const result = await Promise.all<Review>(reviews.map(elem => this.getReview(elem.id)));

    return result;
  }
}
