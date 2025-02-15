// import express from "express";
// import passport from 'passport';
// import { forwardAuthenticated } from "../middleware/checkAuth";

// const router = express.Router();

// router.get(
//   "/github"
//   passport.authenticate('github', { scope: [ 'user:email' ] })
// );


// router.get("/login", forwardAuthenticated, (req, res) => {
//   res.render("login");
// })

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/dashboard",
//     failureRedirect: "/auth/login",
//     /* FIX ME: 😭 failureMsg needed when login fails */
//   })
// );

// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) console.log(err);
//   });
//   res.redirect("/auth/login");
// });

// export default router;

import express, { Request, Response } from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get("/login", forwardAuthenticated, (req: Request, res: Response) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true, //Enable flash messages for login failures
  })
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;


