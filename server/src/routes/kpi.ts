import { Response, Request, Router } from "express";
import KPI from "../models/KPI";
import mongoose from "mongoose";

const router = Router();

interface KPIsData {
    _id: string;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesBycategory: Map<string, number>;
    monthlyData: MonthlyData[];
    dailyData: DailyData[];
}

interface MonthlyData {
    month: string;
    revenue: number;
    expenses: number;
    operationalExpenses: number;
    nonOperationalExpenses: number;
    _id: string;
}

interface DailyData {
    date: string;
    revenue: number;
    expenses: number;
    _id: string;
}

router.get("/kpis", async (req: Request, res: Response): Promise<void> => {
    try {
        const kpis: KPIsData[] = await KPI.find();
        res.status(200).json(kpis);
    } catch (error) {
        let message: string;
        if (error instanceof Error)
            res.status(404).json({ message: error.message });
        else message = String(error);
    }
});

export default router;
