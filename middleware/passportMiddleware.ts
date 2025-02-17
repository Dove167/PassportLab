import { Application } from "express";
import passport from "passport";
import PassportConfig from "./PassportConfig";

import localStrategy from "./passportStrategies/localStrategy";
import passportGitHubStrategy from "./passportStrategies/githubStrategy";

// Pass the strategies directly to the PassportConfig constructor
const passportConfig = new PassportConfig([
  localStrategy,
  passportGitHubStrategy,
]);

const passportMiddleware = (app: Application): void => {
  app.use(passport.initialize());
  app.use(passport.session());
};


export default passportMiddleware; passportConfig;
