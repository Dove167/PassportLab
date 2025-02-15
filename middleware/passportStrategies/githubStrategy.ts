import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import dotenv from "dotenv";

dotenv.config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET||"",
        callbackURL: process.env.GITHUB_CALLBACK_URL||"",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
        try {
        // Mock user storage (Replace with database logic)
        const newUser: Express.User = {
          id: profile.id,
          name: profile.name,
        };
  
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
