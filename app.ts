import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from './middleware/passportMiddleware';
require('dotenv').config()

const port = process.env.PORT || 8000; // Use process.env.PORT for environment variable

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//Middleware for express session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret", // Use environment variable for session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

//Initialize Passport middleware
passportMiddleware(app);

// Logging middleware for debugging (remove in production)
app.use((req, res, next) => {
  console.log(`User details are: `, req.user);
  console.log("Entire session object:", req.session);
  console.log(`Session details are: `, (req.session as any).passport);
  next();
});

//Define routes
app.use("/", indexRoute);
app.use("/auth", authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!'); // Send a user-friendly error message
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
