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
  sortOrder?: "asc" | "desc";
  minAmount?: number;
  maxAmount?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
