import passport from 'passport';
import { Express } from 'express';
import PassportConfig from './passportConfig';
import localStrategy from './passportStrategies/localStrategy';

const passportMiddleware = (app: Express) => {
  // Configure strategies
  const strategies = [localStrategy];
  new PassportConfig(strategies);
  
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportMiddleware;
