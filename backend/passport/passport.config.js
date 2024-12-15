import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        if (!user.password) {
          return done(null, false, { message: "User has no password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};
