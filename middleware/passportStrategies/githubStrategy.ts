import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import { userModel } from "../../models/userModel"; // Import your user model
import { Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ?? "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? "";
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL ?? "";

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
  throw new Error(
    "Missing required environment variables (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, or GITHUB_CALLBACK_URL)."
  );
}

const githubStrategyInstance = new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
    passReqToCallback: true,
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: Express.User | false, info?: any) => void
  ) => {
    try {
      console.log("GitHub Profile:", profile);

      let user = userModel.findById(Number(profile.id));

      if (!user) {
        console.log("User not found. Creating a new user.");
        // Add the user to your mock database
        user = userModel.create({
          id: Number(profile.id), // GitHub ID (convert to number)
          name: profile.displayName || profile.username || "Unknown User", // GitHub name
          email: profile.emails?.[0]?.value || null, // GitHub email (if available)
          password: null, // No password for GitHub users
          role: "user", // Default role
        });
      } else {
        console.log("User found in database:", user);
      }

      return done(null, user); // Pass the user object to Passport
    } catch (error) {
      console.error("Error in GitHub strategy:", error);
      return done(error, false);
    }
  }
);

// Wrap the strategy in an object that conforms to PassportStrategy
const passportGitHubStrategy: PassportStrategy = {
  strategy: githubStrategyInstance,
  name: "github",
};

export default passportGitHubStrategy;
