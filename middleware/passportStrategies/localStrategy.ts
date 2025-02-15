import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email: string, password: string, done) => {
    const user = await getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, Express.User)
      : done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);
/*
FIX ME (types) 😭
*/
passport.serializeUser((user: { id: string }, done: (err: any, id?: string) => void) => {
  done(null, user.id);
});

/*
FIX ME (types) 😭
*/
passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {  let user = getUserById(id);
  const user = await getUserById(id); // Await the promise
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
