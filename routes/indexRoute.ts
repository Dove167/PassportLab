import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  const user = req.user as Express.User; 
  res.render('dashboard', { user });
});


export default router;
