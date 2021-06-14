import { RESTDataSource } from "apollo-datasource-rest";
import axios from "axios";
import { Review, User } from "../../generated/graphql";

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

  async getReports(id: string) {
    return this.get<Review[]>(
      `escort/reviews?entityId=${id}&entityType=product&orderBy=latest&page=1&plugin=escort&rpp=100`
    );
  }

  async getReview(id: string) {
    try {
      const res = await axios.get<any, any>(
        `${this.baseURL}/escort/reviews/${id}`,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        }
      );

      return res.data.data.review;
    } catch (e) {
      console.log(e);
    }
  }

  async getPhotos(userId: number) {
    const user = await this.getOne(userId);
    const reviews = await this.getReviews(
      `entityId=${user.id}&entityType=product&orderBy=latest&page=1&plugin=escort&rpp=40`
    );
    const result = await Promise.all<Review>(
      reviews.map((elem) => this.getReview(elem.id))
    );

    return result;
  }
}
