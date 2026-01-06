import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/contants";
import { ResponseFormatter } from "../../utils/responseFormatter";
import { UserPayload } from "../../types";

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
      res.status(401).json(ResponseFormatter.error("Access token required"));
      return;
    }

    jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(403)
          .json(ResponseFormatter.error("Invalid or expired access token"));
        return;
      }
      req.user = decoded as UserPayload;
      next();
    });
  }
}
