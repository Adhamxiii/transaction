import bcrypt from "bcryptjs";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser: ", error);
        throw new Error(error.message || "Error in authUser");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.error("Error in user: ", error);
        throw new Error(error.message || "Error in user");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("Please provide all the required fields");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilePicture =
          gender === "male" ? boyProfilePicture : girlProfilePicture;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          profilePicture,
          gender,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error in createUser: ", error);
        throw new Error(error.message || "Error in creating user");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password)
          throw new Error("Please fill in all the fields");
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error in login: ", error);
        throw new Error(error.message || "Error in login");
      }
    },
    logout: (_, __, context) => {
      try {
        context.logout();
        context.req.session.destroy((err) => {
          if (err) console.error(err);
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error in logout: ", error);
        throw new Error(error.message || "Error in logout");
      }
    },
  },
  User: {
    transactions: async (parent) => {
      try {
        const transactions = await Transaction.find({ userId: parent._id });
        return transactions;
      } catch (error) {
        console.error("Error in user posts: ", error);
        throw new Error(error.message || "Error in user posts");
      }
    },
  },
};

export default userResolver;
