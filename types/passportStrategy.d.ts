import { Strategy as PassportStrategyType } from "passport";

export interface PassportStrategy {
  name: string;
  strategy: PassportStrategyType;
}
