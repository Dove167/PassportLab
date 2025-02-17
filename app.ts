import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from './middleware/passportMiddleware';
import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";
import adminRoute from "./routes/adminRoute";
import { ensureAuthenticated } from "./middleware/checkAuth"; // Added import
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.port || 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);



// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log((req.session as any).passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/admin", ensureAuthenticated, adminRoute); //ERROR HERE: Cannot find name 'ensureAuthenticated'.ts(2304) 

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Something went wrong.');
  } else {
    res.status(500).send(`Error: ${err.message}`);
  }
});


app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
