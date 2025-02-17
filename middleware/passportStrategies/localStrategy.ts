import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById, getUserByIdOrEmail } from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email: string, password: string, done) => {
    try {
      const user = await getUserByIdOrEmail(email);

      if (!user) {
        return done(null, false, { message: `User does not exist with email: ${email}` });
      }

      const isValid = isPasswordValid(user, password);
      if (!isValid) {
        return done(null, false, { message: "Invalid password. Please try again." });
      }

      return done(null, user);
    } catch (error) {
      console.error("Error in LocalStrategy:", error);
      return done(error);
    }
  }
);

function isPasswordValid(user: Express.User, password: string): boolean {
  return user.password === password;
}

passport.use(localStrategy);

passport.serializeUser((user: Express.User, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    console.error("Error during serialization:", error);
    done(error, null);
  }
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await getUserById(id);
    if (user) {
      return done(null, user);
    }
    return done(new Error("User not found"), null);
  } catch (error) {
    console.error("Error during deserialization:", error);
    return done(error, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;
