import jwt, { SignOptions } from "jsonwebtoken";
import { CONFIG } from "../../config/contants";
import { User, UserPayload } from "../../types/index";

export class AuthService {
  private users: User[] = [{ id: 1, username: "test", password: "12345" }];
  private refreshTokensStore: string[] = [];

  generateAccessToken(user: UserPayload): string {
    const options: SignOptions = {
      expiresIn: CONFIG.ACCESS_TOKEN_EXPIRY,
    };
    return jwt.sign(user, CONFIG.ACCESS_TOKEN_SECRET, options);
  }

  generateRefreshToken(user: UserPayload): string {
    const options: SignOptions = {
      expiresIn: CONFIG.REFRESH_TOKEN_EXPIRY,
    };
    const refreshToken = jwt.sign(user, CONFIG.REFRESH_TOKEN_SECRET, options);
    this.refreshTokensStore.push(refreshToken);
    return refreshToken;
  }

  validateUser(username: string, password: string): User | null {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  }

  registerUser(username: string, password: string): User | null {
    const exists = this.users.find((u) => u.username === username);
    if (exists) return null;

    const newUser: User = {
      id: this.users.length + 1,
      username,
      password,
    };
    this.users.push(newUser);
    return newUser;
  }

  verifyRefreshToken(token: string): UserPayload | null {
    if (!this.refreshTokensStore.includes(token)) return null;

    try {
      const decoded = jwt.verify(
        token,
        CONFIG.REFRESH_TOKEN_SECRET
      ) as UserPayload;
      return decoded;
    } catch {
      return null;
    }
  }

  revokeRefreshToken(token: string): boolean {
    const index = this.refreshTokensStore.indexOf(token);
    if (index > -1) {
      this.refreshTokensStore.splice(index, 1);
      return true;
    }
    return false;
  }
}
