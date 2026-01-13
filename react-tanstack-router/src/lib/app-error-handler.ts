import { AxiosError } from 'axios'
import { EErrorCode, type IApiErrorResponse } from '@/types/api'

export interface AppError {
  message: string
  code: EErrorCode
  statusCode?: number
  field?: string
  details?: Record<string, unknown>
  originalError?: unknown
}

export class AppErrorHandler {
  static handleApiError(error: AxiosError<IApiErrorResponse>): AppError {
    // Network or timeout error
    if (!error.response) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        return {
          message: 'Request timed out. Please try again.',
          originalError: error,
          code: EErrorCode.TIMEOUT,
        }
      }
      return {
        code: EErrorCode.NETWORK,
        message: 'Network error. Please check your connection.',
        originalError: error,
      }
    }

    const { status, data } = error.response

    // Check if response is HTML (wrong content-type or route not found)
    const contentType = error.response.headers['content-type']
    if (contentType?.includes('text/html')) {
      return {
        message: 'API endpoint not found. Please contact support.',
        code: EErrorCode.NOT_FOUND,
        statusCode: status,
        originalError: error,
      }
    }

    // Safely extract error data with fallbacks
    const apiMessage = data?.message || this.getDefaultMessage(status)
    const apiCode = data?.code || this.getDefaultCode(status)
    const apiDetails = data?.details

    // Return consistent error structure
    return {
      message: apiMessage,
      code: apiCode,
      statusCode: status,
      details: apiDetails as Record<string, unknown>,
      originalError: error,
    }
  }

  private static getDefaultMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.'
      case 401:
        return 'Authentication required. Please log in.'
      case 403:
        return 'You do not have permission to perform this action.'
      case 404:
        return 'The requested resource was not found.'
      case 422:
        return 'Validation failed. Please check your input.'
      case 429:
        return 'Too many requests. Please try again later.'
      case 500:
        return 'Server error. Please try again later.'
      case 503:
        return 'Service temporarily unavailable. Please try again later.'
      default:
        return 'An unexpected error occurred.'
    }
  }

  private static getDefaultCode(status: number): EErrorCode {
    switch (status) {
      case 400:
        return EErrorCode.BAD_REQUEST
      case 401:
        return EErrorCode.AUTHENTICATION
      case 403:
        return EErrorCode.AUTHORIZATION
      case 404:
        return EErrorCode.NOT_FOUND
      case 422:
        return EErrorCode.VALIDATION
      case 500:
      default:
        return EErrorCode.SERVER
    }
  }

  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'An unexpected error occurred'
  }

  static isValidationError(error: AppError): boolean {
    return error.code === EErrorCode.VALIDATION
  }

  static isAuthError(error: AppError): boolean {
    return error.code === EErrorCode.AUTHENTICATION || error.statusCode === 401
  }

  static isNetworkError(error: AppError): boolean {
    return (
      error.code === EErrorCode.NETWORK || error.code === EErrorCode.TIMEOUT
    )
  }
}
