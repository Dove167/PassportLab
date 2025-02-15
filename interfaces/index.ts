import { Strategy } from 'passport';

export interface PassportStrategy {
  name: string;
  strategy: Strategy;
}

export interface User {
  id: number;
  githubId?: string;
  name: string;
  email?: string;
  role: 'user' | 'admin';
  provider: 'local' | 'github';
}
