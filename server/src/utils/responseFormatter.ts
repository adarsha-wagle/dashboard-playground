import { ApiResponse } from "../types";

export class ResponseFormatter {
  static success<T>(message: string, data?: T, meta?: any): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      meta,
    };
  }

  static error(message: string, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
    };
  }
}
