import passport from "passport";
import { PassportStrategy } from "../types/passportStrategy";


export default class PassportConfig {
  constructor(strategies: PassportStrategy[]) {
    this.addStrategies(strategies);
  }

  private addStrategies(strategies: PassportStrategy[]): void {
    strategies.forEach((passportStrategy: PassportStrategy) => {
      passport.use(passportStrategy.name, passportStrategy.strategy);
    });
  }
}

