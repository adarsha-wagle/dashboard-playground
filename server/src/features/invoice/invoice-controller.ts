import { Request, Response } from "express";
import { InvoiceService } from "../../features/invoice/invoice-service";
import { ResponseFormatter } from "../../utils/responseFormatter";
import { PaginationQuery } from "../../types/index";

export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  getInvoices = (req: Request, res: Response): void => {
    const query: PaginationQuery = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      search: req.query.search as string,
      status: req.query.status as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as "asc" | "desc",
      minAmount: req.query.minAmount
        ? parseFloat(req.query.minAmount as string)
        : undefined,
      maxAmount: req.query.maxAmount
        ? parseFloat(req.query.maxAmount as string)
        : undefined,
      dateFrom: req.query.dateFrom as string,
      dateTo: req.query.dateTo as string,
    };

    const { invoices, total } = this.invoiceService.getInvoices(query);
    const totalPages = Math.ceil(total / (query.limit || 10));

    res.json(
      ResponseFormatter.success("Invoices retrieved successfully", invoices, {
        page: query.page,
        limit: query.limit,
        total,
        totalPages,
      })
    );
  };

  getInvoiceById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const invoice = this.invoiceService.getInvoiceById(id);

    if (!invoice) {
      res.status(404).json(ResponseFormatter.error("Invoice not found"));
      return;
    }

    res.json(
      ResponseFormatter.success("Invoice retrieved successfully", invoice)
    );
  };

  createInvoice = (req: Request, res: Response): void => {
    const { customer, date, dueDate, description, items, status } = req.body;

    // Validation
    if (!customer) {
      res.status(400).json(ResponseFormatter.error("Customer is required"));
      return;
    }
    if (!date) {
      res.status(400).json(ResponseFormatter.error("Invoice date is required"));
      return;
    }
    if (!dueDate) {
      res.status(400).json(ResponseFormatter.error("Due date is required"));
      return;
    }

    const dateObj = new Date(date);
    const dueObj = new Date(dueDate);

    if (isNaN(dateObj.getTime())) {
      res.status(400).json(ResponseFormatter.error("Invalid date format"));
      return;
    }
    if (isNaN(dueObj.getTime())) {
      res.status(400).json(ResponseFormatter.error("Invalid due date format"));
      return;
    }
    if (dueObj < dateObj) {
      res
        .status(400)
        .json(
          ResponseFormatter.error(
            "Due date cannot be earlier than invoice date"
          )
        );
      return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json(ResponseFormatter.error("Items are required"));
      return;
    }

    for (const item of items) {
      if (!item.item || typeof item.item !== "string") {
        res.status(400).json(ResponseFormatter.error("Item name is required"));
        return;
      }
      if (!item.qty || item.qty <= 0) {
        res
          .status(400)
          .json(ResponseFormatter.error("Item quantity must be > 0"));
        return;
      }
      if (!item.price || item.price <= 0) {
        res.status(400).json(ResponseFormatter.error("Item price must be > 0"));
        return;
      }
    }

    const newInvoice = this.invoiceService.createInvoice({
      customer,
      date,
      dueDate,
      description,
      items,
      status: status || "Unpaid",
    });

    res
      .status(201)
      .json(
        ResponseFormatter.success("Invoice created successfully", newInvoice)
      );
  };

  updateInvoice = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const updates = req.body;

    // Date validation if provided
    if (updates.date && isNaN(new Date(updates.date).getTime())) {
      res.status(400).json(ResponseFormatter.error("Invalid date format"));
      return;
    }
    if (updates.dueDate && isNaN(new Date(updates.dueDate).getTime())) {
      res.status(400).json(ResponseFormatter.error("Invalid due date format"));
      return;
    }

    // Items validation if provided
    if (updates.items) {
      if (!Array.isArray(updates.items) || updates.items.length === 0) {
        res
          .status(400)
          .json(ResponseFormatter.error("Items must be a non-empty array"));
        return;
      }
      for (const item of updates.items) {
        if (!item.item || !item.qty || !item.price) {
          res
            .status(400)
            .json(
              ResponseFormatter.error(
                "Each item must have item, qty, and price"
              )
            );
          return;
        }
      }
    }

    const updatedInvoice = this.invoiceService.updateInvoice(id, updates);
    if (!updatedInvoice) {
      res.status(404).json(ResponseFormatter.error("Invoice not found"));
      return;
    }

    res.json(
      ResponseFormatter.success("Invoice updated successfully", updatedInvoice)
    );
  };

  deleteInvoice = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const deleted = this.invoiceService.deleteInvoice(id);

    if (!deleted) {
      res.status(404).json(ResponseFormatter.error("Invoice not found"));
      return;
    }

    res.json(ResponseFormatter.success("Invoice deleted successfully"));
  };
}
