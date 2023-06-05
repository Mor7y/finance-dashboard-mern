import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const ProductSchema = new Schema(
    {
        price: {
            type: Number,
            set: (v: string): string => v.replace("$", ""),
        },
        expense: {
            type: Number,
            set: (v: string): string => v.replace("$", ""),
        },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transactions",
            },
        ],
    },
    { timestamps: true }
);

type Products = InferSchemaType<typeof ProductSchema>;

const Product = model<Products>("Product", ProductSchema);

export default Product;
