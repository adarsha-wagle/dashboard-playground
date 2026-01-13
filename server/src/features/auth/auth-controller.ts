import { Request, Response } from "express";
import { AuthService } from "../../features/auth/auth-service";
import { ResponseFormatter } from "../../utils/responseFormatter";
import { EErrorCode, ESuccessCode } from "../../types";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json(
          ResponseFormatter.error(
            400,
            EErrorCode.VALIDATION,
            "Username and password required"
          )
        );
      return;
    }

    const user = this.authService.validateUser(username, password);
    console.log("user", user);
    if (!user) {
      res
        .status(401)
        .json(
          ResponseFormatter.error(
            401,
            EErrorCode.AUTHENTICATION,
            "Invalid username or password"
          )
        );
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
      ResponseFormatter.success(200, ESuccessCode.LOGIN, "Login successful", {
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
        .json(
          ResponseFormatter.error(
            400,
            EErrorCode.VALIDATION,
            "Username and password required"
          )
        );
      return;
    }

    const newUser = this.authService.registerUser(username, password);
    if (!newUser) {
      res
        .status(400)
        .json(
          ResponseFormatter.error(
            400,
            EErrorCode.ALREADY_EXISTS,
            "User already exists"
          )
        );
      return;
    }

    res.status(201).json(
      ResponseFormatter.success(
        201,
        ESuccessCode.CREATED,
        "User registered successfully",
        {
          user: { id: newUser.id, username: newUser.username },
        }
      )
    );
  };

  refresh = (req: Request, res: Response): void => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res
        .status(401)
        .json(
          ResponseFormatter.error(
            401,
            EErrorCode.AUTHENTICATION,
            "Refresh token required"
          )
        );
      return;
    }

    const user = this.authService.verifyRefreshToken(refreshToken);
    if (!user) {
      res
        .status(401)
        .json(
          ResponseFormatter.error(
            401,
            EErrorCode.AUTHENTICATION,
            "Invalid refresh token"
          )
        );
      return;
    }

    const accessToken = this.authService.generateAccessToken({
      id: user.id,
      username: user.username,
    });

    res.json(
      ResponseFormatter.success(200, ESuccessCode.REFRESH, "Token refreshed", {
        accessToken,
      })
    );
  };

  logout = (req: Request, res: Response): void => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      this.authService.revokeRefreshToken(refreshToken);
    }

    res.clearCookie("refreshToken");
    res.json(
      ResponseFormatter.success(
        200,
        ESuccessCode.LOGOUT,
        "Logged out successfully",
        null
      )
    );
  };
}
