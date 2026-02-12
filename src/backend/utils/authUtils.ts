import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const requiresAuth = function (this: any, request: any) {
  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = jwt_decode(encodedToken) as {
    _id: string;
    email: string;
  };
  if (decodedToken) {
    const user = this.db.users.findBy({ email: decodedToken.email });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
