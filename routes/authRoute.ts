import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

// Extend the session interface to include `messages`
declare module "express-session" {
  interface SessionData {
    messages: string[]; // Add messages to the session type
  }
}

// Define the types for Passport's callback parameters
interface PassportAuthenticateCallback {
  (err: any, user: Express.User | false, info: { message?: string } | undefined): void;
}

// GET /auth/login - Render the login page
router.get("/login", forwardAuthenticated, (req: Request, res: Response) => {
  const messages = req.session.messages || []; // Retrieve messages from the session
  req.session.messages = []; // Clear messages after displaying them
  res.render("login", { messages }); // Pass messages to the view
});

// POST /auth/login - Handle login with Passport.js
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (err: any, user: Express.User | false, info: { message?: string } | undefined) => {
        if (err) {
          console.error("Error during authentication:", err);
          return res.status(500).render("login", { messages: ["An error occurred during login."] });
        }

        if (!user) {
          // If authentication fails, store the failure message in session and redirect
          req.session.messages = [info?.message || "Login failed. Please try again."];
          return res.redirect("/auth/login");
        }

        // Log the user in
        req.logIn(user, (err) => {
          if (err) {
            console.error("Error during login:", err);
            req.session.messages = ["An error occurred during login."];
            return res.redirect("/auth/login");
          }

          // Redirect to the dashboard on successful login
          return res.redirect("/dashboard");
        });
      }
    )(req, res, next);
  }
);

router.get("/logout", (req: Request, res: Response) => {
  console.log('Logout initiated');
  req.logout((err) => {
    console.log('Passport logout completed');
    req.session.regenerate((err) => {
      console.log('Session regenerated');
      res.redirect("/auth/login");
    });
  });
});

// GET /auth/github - Start GitHub OAuth flow
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }) // Request access to the user's email
);

// GET /auth/github/callback - Handle GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login", // Redirect here if authentication fails
    successRedirect: "/dashboard", // Redirect here if authentication succeeds
  })
);

export default router;
