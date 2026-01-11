import {
  IApiSuccessResponse,
  IApiErrorResponse,
  ESuccessCode,
  EErrorCode,
  IMetadata,
  IPaginationResult,
} from "../types";

export class ResponseFormatter {
  static success<T>(
    statusCode: number,
    code: ESuccessCode,
    message: string,
    data: T
  ): IApiSuccessResponse<T> {
    return {
      isSuccess: true,
      statusCode,
      code,
      message,
      data,
    };
  }

  static error(
    statusCode: number,
    code: EErrorCode,
    message: string,
    details?: unknown
  ): IApiErrorResponse {
    return {
      isSuccess: false,
      statusCode,
      code,
      message,
      details,
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number
  ): IPaginationResult<T> {
    const totalPages = Math.ceil(total / limit);
    const metadata: IMetadata = {
      currentPage: page,
      limit,
      totalItems: total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    return {
      data,
      metadata,
    };
  }
}
