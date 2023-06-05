import mongoose from "mongoose";
import { Response, Request, Router } from "express";
import Product from "../models/Product";

const router = Router();

interface ProductsData {
    price: number;
    expense: number;
    transaction: mongoose.Types.ObjectId[];
}

router.get("/products", async (req: Request, res: Response) => {
    try {
        const products: ProductsData[] = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        let message: string;
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            message = String(error);
            console.error(message);
        }
    }
});

export default router;
