import { Article } from "types/article";
import { User } from "types/user";

export interface MediatorInterface {
  getUserByEmail(email: string): Promise<User>;
  updateUserProfile(userProfileData: User): Promise<User>;
  publishArticle(article: Article, userEmail: User["email"]): Promise<Article>;
}
