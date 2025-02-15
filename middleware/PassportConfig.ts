import passport from 'passport';
import { PassportStrategy } from '../interfaces';

export default class PassportConfig {
  constructor(strategies: PassportStrategy[]) {
    strategies.forEach((strategy) => {
      passport.use(strategy.name, strategy.strategy);
    });
  }
}
