import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/contants";
import { ResponseFormatter } from "../../utils/responseFormatter";
import { EErrorCode, UserPayload } from "../../types";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export class AuthMiddleware {
  static authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json(
          ResponseFormatter.error(
            401,
            EErrorCode.AUTHENTICATION,
            "Access token required"
          )
        );
      return;
    }

    jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(403)
          .json(
            ResponseFormatter.error(
              403,
              EErrorCode.AUTHORIZATION,
              "Invalid or expired access token"
            )
          );
        return;
      }
      req.user = decoded as UserPayload;
      next();
    });
  }
}
