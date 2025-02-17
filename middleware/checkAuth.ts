import { Request, Response, NextFunction } from "express";

// Ensure the user is authenticated
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

// Forward user if already authenticated
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
};

// Add to existing checkAuth.ts
export const ensureAdmin = (req: Request, res: Response, next: NextFunction): void => {
  console.log("Checking admin access...");
  console.log("Is authenticated:", req.isAuthenticated());
  console.log("User details:", req.user);

  if (req.isAuthenticated() && req.user?.role === "admin") {
    return next();
  }

  res.redirect("/dashboard");
};

