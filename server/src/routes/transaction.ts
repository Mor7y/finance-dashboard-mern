import { Response, Request, Router } from "express";
import Transactions from "../models/Transactions";
import mongoose from "mongoose";

const router = Router();

interface TransactionsData {
    buyer?: string;
    amount?: number;
    productIds: mongoose.Types.ObjectId[];
}

router.get("/kpis", async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions: TransactionsData[] = await Transactions.find()
            .limit(50)
            .sort({ createdOn: -1 });
        res.status(200).json(transactions);
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
