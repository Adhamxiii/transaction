import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
    authUser: async (parent, args, context) => {
      return context.user;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {
    // signUp: async (parent, args, context) => {
    //   const { username, name, password, profilePicture, gender } = args.input;
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   const newUser = new User({
    //     username,
    //     name,
    //     password: hashedPassword,
    //     profilePicture,
    //     gender,
    //   });
    //   try {
    //     await newUser.save();
    //     return newUser;
    //   } catch (error) {
  },
};

export default userResolver;
