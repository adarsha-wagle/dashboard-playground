import { Request, Response } from "express";
import { AuthService } from "../../features/auth/auth-service";
import { ResponseFormatter } from "../../utils/responseFormatter";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json(ResponseFormatter.error("Username and password required"));
      return;
    }

    const user = this.authService.validateUser(username, password);
    if (!user) {
      res
        .status(401)
        .json(ResponseFormatter.error("Invalid username or password"));
      return;
    }

    const userPayload = { id: user.id, username: user.username };
    const accessToken = this.authService.generateAccessToken(userPayload);
    const refreshToken = this.authService.generateRefreshToken(userPayload);

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json(
      ResponseFormatter.success("Login successful", {
        accessToken,
        user: userPayload,
      })
    );
  };

  register = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json(ResponseFormatter.error("Username and password required"));
      return;
    }

    const newUser = this.authService.registerUser(username, password);
    if (!newUser) {
      res.status(400).json(ResponseFormatter.error("User already exists"));
      return;
    }

    res.json(
      ResponseFormatter.success("User registered successfully", {
        user: { id: newUser.id, username: newUser.username },
      })
    );
  };

  refresh = (req: Request, res: Response): void => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json(ResponseFormatter.error("Refresh token required"));
      return;
    }

    const user = this.authService.verifyRefreshToken(refreshToken);
    if (!user) {
      res.status(403).json(ResponseFormatter.error("Invalid refresh token"));
      return;
    }

    const accessToken = this.authService.generateAccessToken({
      id: user.id,
      username: user.username,
    });

    res.json(ResponseFormatter.success("Token refreshed", { accessToken }));
  };

  logout = (req: Request, res: Response): void => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      this.authService.revokeRefreshToken(refreshToken);
    }

    res.clearCookie("refreshToken");
    res.json(ResponseFormatter.success("Logged out successfully"));
  };
}
