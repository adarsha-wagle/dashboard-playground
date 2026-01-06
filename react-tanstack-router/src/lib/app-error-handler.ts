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

    const apiMessage = data?.message || 'An error occurred'
    const apiCode = data?.code
    const apiDetails = data?.details

    switch (status) {
      case 400:
        return {
          message: apiMessage,
          code: apiCode,
          details: apiDetails as Record<string, unknown>,
          originalError: error,
        }

      case 401:
        return {
          message: apiMessage,
          code: apiCode,
          originalError: error,
        }

      case 403:
        return {
          message: apiMessage,
          code: apiCode,
          originalError: error,
        }

      case 404:
        return {
          message: apiMessage,
          code: apiCode,
          originalError: error,
        }

      case 500:
      default:
        return {
          message: apiMessage,
          code: apiCode,
          originalError: error,
        }
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
    return (
      error.code === EErrorCode.AUTHENTICATION ||
      error.code === EErrorCode.AUTHORIZATION
    )
  }

  static isNetworkError(error: AppError): boolean {
    return (
      error.code === EErrorCode.NETWORK || error.code === EErrorCode.TIMEOUT
    )
  }
}
