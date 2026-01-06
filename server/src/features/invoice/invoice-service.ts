import { Invoice, InvoiceItem, PaginationQuery } from "../../types/index";

export class InvoiceService {
  private invoices: Invoice[] = [
    {
      id: 1,
      invoiceNumber: "INV-1001",
      customer: "John Doe",
      amount: 250,
      date: "2025-01-05",
      dueDate: "2025-01-15",
      status: "Paid",
      description: "Web design services",
      items: [
        { item: "Website mockup", qty: 1, price: 150 },
        { item: "Revisions", qty: 2, price: 50 },
      ],
    },
    {
      id: 2,
      invoiceNumber: "INV-1002",
      customer: "Alice Smith",
      amount: 120,
      date: "2025-01-08",
      dueDate: "2025-01-18",
      status: "Unpaid",
      description: "Consultation session",
      items: [{ item: "Consultation Session", qty: 2, price: 60 }],
    },
    {
      id: 3,
      invoiceNumber: "INV-1003",
      customer: "Bob Johnson",
      amount: 430,
      date: "2025-01-12",
      dueDate: "2025-01-22",
      status: "Overdue",
      description: "Office hardware supply",
      items: [
        { item: "Laptop", qty: 1, price: 300 },
        { item: "Keyboard", qty: 2, price: 40 },
        { item: "Mouse", qty: 2, price: 25 },
      ],
    },
  ];

  private getNextInvoiceNumber(): string {
    if (this.invoices.length === 0) return "INV-1001";
    const last = this.invoices[this.invoices.length - 1].invoiceNumber;
    const num = parseInt(last.split("-")[1]) + 1;
    return `INV-${num}`;
  }

  private calculateAmount(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  }

  getInvoices(query: PaginationQuery): { invoices: Invoice[]; total: number } {
    let filtered = [...this.invoices];

    // Search filter
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filtered = filtered.filter(
        (inv) =>
          inv.customer.toLowerCase().includes(searchLower) ||
          inv.invoiceNumber.toLowerCase().includes(searchLower) ||
          inv.description.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (query.status) {
      filtered = filtered.filter((inv) => inv.status === query.status);
    }

    // Amount range filter
    if (query.minAmount !== undefined) {
      filtered = filtered.filter((inv) => inv.amount >= query.minAmount!);
    }
    if (query.maxAmount !== undefined) {
      filtered = filtered.filter((inv) => inv.amount <= query.maxAmount!);
    }

    // Date range filter
    if (query.dateFrom) {
      filtered = filtered.filter((inv) => inv.date >= query.dateFrom!);
    }
    if (query.dateTo) {
      filtered = filtered.filter((inv) => inv.date <= query.dateTo!);
    }

    // Sorting
    const sortBy = query.sortBy || "date";
    const sortOrder = query.sortOrder || "desc";
    filtered.sort((a, b) => {
      let aVal: any = a[sortBy as keyof Invoice];
      let bVal: any = b[sortBy as keyof Invoice];

      if (sortBy === "date" || sortBy === "dueDate") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    const total = filtered.length;

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return { invoices: paginated, total };
  }

  getInvoiceById(id: number): Invoice | null {
    return this.invoices.find((inv) => inv.id === id) || null;
  }

  createInvoice(
    data: Omit<Invoice, "id" | "invoiceNumber" | "amount">
  ): Invoice {
    const amount = this.calculateAmount(data.items);
    const newInvoice: Invoice = {
      id: this.invoices.length + 1,
      invoiceNumber: this.getNextInvoiceNumber(),
      customer: data.customer,
      amount,
      date: data.date,
      dueDate: data.dueDate,
      status: data.status || "Unpaid",
      description: data.description || "",
      items: data.items,
    };
    this.invoices.push(newInvoice);
    return newInvoice;
  }

  updateInvoice(id: number, data: Partial<Invoice>): Invoice | null {
    const index = this.invoices.findIndex((inv) => inv.id === id);
    if (index === -1) return null;

    const invoice = this.invoices[index];
    const updatedInvoice = { ...invoice, ...data };

    // Recalculate amount if items changed
    if (data.items) {
      updatedInvoice.amount = this.calculateAmount(data.items);
    }

    this.invoices[index] = updatedInvoice;
    return updatedInvoice;
  }

  deleteInvoice(id: number): boolean {
    const index = this.invoices.findIndex((inv) => inv.id === id);
    if (index === -1) return false;
    this.invoices.splice(index, 1);
    return true;
  }
}
