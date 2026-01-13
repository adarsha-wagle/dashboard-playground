import { SignOptions } from "jsonwebtoken";

export const CONFIG = {
  ACCESS_TOKEN_SECRET: "access-secret-example",
  REFRESH_TOKEN_SECRET: "refresh-secret-example",
  ACCESS_TOKEN_EXPIRY: "1m" as SignOptions["expiresIn"],
  REFRESH_TOKEN_EXPIRY: "20m" as SignOptions["expiresIn"],
  PORT: 5000,
  CORS_ORIGINS: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4173",
  ],
};
