import express, { Request, Response } from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate('github', { 
    scope: ['user:email'],
    failureFlash: 'Failed to authenticate with GitHub' 
  })
);

router.get(
  "/github/callback",
  passport.authenticate('github', { 
    failureRedirect: '/auth/login',
    failureFlash: 'GitHub authentication failed' 
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);


router.get("/login", forwardAuthenticated, (req: Request, res: Response) => {
  const errors = req.session.messages || [];
  res.render("login", { messages: errors });
});

// Add flash messages support
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: "Invalid email or password" // Specific error message
  })
);


router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;


