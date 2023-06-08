import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const TransactionSchema = new Schema(
    {
        buyer: {
            type: String,
        },
        amount: {
            type: Number,
            set: (v: string): string => v.replace("$", ""),
        },
        productIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true }
);

type Transactions = InferSchemaType<typeof TransactionSchema>;

const Transaction = model<Transactions>("Transaction", TransactionSchema);

export default Transaction;
