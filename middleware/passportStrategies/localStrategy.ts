import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByEmailIdAndPassword } from '../../controllers/userController';

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await getUserByEmailIdAndPassword(email, password);
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err);
    }
  }
);

export default {
  name: 'local',
  strategy: localStrategy
};
