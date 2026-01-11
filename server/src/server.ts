import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CONFIG } from "./config/contants";
import { AuthService } from "./features/auth/auth-service";
import { InvoiceService } from "./features/invoice/invoice-service";
import { AuthController } from "./features/auth/auth-controller";
import { InvoiceController } from "./features/invoice/invoice-controller";
import { AuthMiddleware } from "./features/auth/auth-middleware";

class Server {
  private app: Application;
  private authService: AuthService;
  private invoiceService: InvoiceService;
  private authController: AuthController;
  private invoiceController: InvoiceController;

  constructor() {
    this.app = express();
    this.authService = new AuthService();
    this.invoiceService = new InvoiceService();
    this.authController = new AuthController(this.authService);
    this.invoiceController = new InvoiceController(this.invoiceService);

    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(
      cors({
        origin: CONFIG.CORS_ORIGINS,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setupRoutes(): void {
    // Auth routes
    this.app.post("/login", this.authController.login);
    this.app.post("/register", this.authController.register);
    this.app.post("/refresh", this.authController.refresh);
    this.app.post("/logout", this.authController.logout);

    // Invoice routes (protected)
    this.app.get(
      "/invoices",
      AuthMiddleware.authenticateToken,
      this.invoiceController.getInvoices
    );
    this.app.get(
      "/invoices/:id",
      AuthMiddleware.authenticateToken,
      this.invoiceController.getInvoiceById
    );
    this.app.post(
      "/invoices",
      AuthMiddleware.authenticateToken,
      this.invoiceController.createInvoice
    );
    this.app.put(
      "/invoices/:id",
      AuthMiddleware.authenticateToken,
      this.invoiceController.updateInvoice
    );
    this.app.delete(
      "/invoices/:id",
      AuthMiddleware.authenticateToken,
      this.invoiceController.deleteInvoice
    );
    this.app.get("/health", (req, res) => res.send("OK"));
  }

  public start(): void {
    this.app.listen(CONFIG.PORT, () => {
      console.log(`🚀 Server running on port ${CONFIG.PORT}`);
    });
  }
}

// Start server
const server = new Server();
server.start();

export default Server;
