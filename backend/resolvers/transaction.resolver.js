import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error in transactions: ", error);
        throw new Error(error.message || "Error in transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.error("Error in transaction: ", error);
        throw new Error(error.message || "Error in transaction");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        if (!context.getUser) throw new Error("Unauthorized");

        const newTransaction = new Transaction({
          ...input,
          userId: await context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error in createTransaction: ", error);
        throw new Error(error.message || "Error in createTransaction");
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        if (!context.getUser) throw new Error("Unauthorized");

        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("Error in updateTransaction: ", error);
        throw new Error(error.message || "Error in updateTransaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        if (!context.getUser) throw new Error("Unauthorized");
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        console.error("Error in deleteTransaction: ", error);
        throw new Error(error.message || "Error in deleteTransaction");
      }
    },
  },
};

export default transactionResolver;
