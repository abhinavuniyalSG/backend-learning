declare global {
  namespace Express {
    interface Request {
      validated?: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      };
      user?: {
        id: string;
        mail: string;
        role: string;
      };
    }
  }
}

export {};
