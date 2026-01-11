export interface User {
  id: number;
  username: string;
  password: string;
}

export interface UserPayload {
  id: number;
  username: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Overdue";
  description: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  item: string;
  qty: number;
  price: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: TSortOrder;
  minAmount?: number;
  maxAmount?: number;
  dateFrom?: string;
  dateTo?: string;
}

export enum ESuccessCode {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
  FETCHED = "FETCHED",
  LOGIN = "LOGIN_SUCCESS",
  LOGOUT = "LOGOUT_SUCCESS",
  REFRESH = "TOKEN_REFRESHED",
}

export interface IApiSuccessResponse<T> {
  isSuccess: true;
  statusCode: number;
  code: ESuccessCode;
  message: string;
  data: T;
}

export enum EErrorCode {
  VALIDATION = "VALIDATION_ERROR",
  AUTHENTICATION = "AUTHENTICATION_ERROR",
  AUTHORIZATION = "AUTHORIZATION_ERROR",
  BAD_REQUEST = "BAD_REQUEST_ERROR",
  NOT_FOUND = "NOT_FOUND_ERROR",
  DATABASE = "DATABASE_ERROR",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  FORBIDDEN = "FORBIDDEN",
  SERVER = "SERVER_ERROR",
  NETWORK = "NETWORK_ERROR",
  TIMEOUT = "TIMEOUT_ERROR",
  UNKNOWN = "UNKNOWN_ERROR",
  API = "API_ERROR",
}

export interface IApiErrorResponse {
  isSuccess: false;
  statusCode: number;
  code: EErrorCode;
  message: string;
  details?: unknown;
}

export interface IMetadata {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IPaginationResult<T> {
  data: T[];
  metadata: IMetadata;
}

export type TSortOrder = "asc" | "desc";

export interface IFilterQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: TSortOrder;
}
