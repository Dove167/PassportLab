import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces';
import { userModel } from '../../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

interface Profile {
  id: string;
  displayName?: string;
  username?: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
}

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:8000/auth/github/callback",
    scope: ['user:email'],
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile: Profile, done) => {
    try {
      // Check if user exists in database
      const existingUser = await userModel.findOne({ githubId: profile.id });
      
      if (existingUser) {
        return done(null, existingUser);
      }

      // Create new user
      const newUser: User = {
        id: database.length + 1, // Numeric ID
        githubId: profile.id,
        name: profile.displayName || profile.username || "GitHub User",
        email: profile.emails?.[0]?.value,
        role: 'user',
        provider: 'github'
      };

      // Add to database (mock implementation)
      userModel.create(newUser);
      
      return done(null, newUser);
    } catch (error) {
      return done(error instanceof Error ? error : new Error('GitHub authentication failed'));
    }
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy
};

export default passportGitHubStrategy;
