import { InferSchemaType, Schema, model } from "mongoose";

const monthSchema = new Schema({
    month: String,
    revenue: {
        type: Number,
        set: (v: string): string => v.replace("$", ""),
    },
    expenses: {
        type: Number,
        set: (v: string): string => v.replace("$", ""),
    },
    operationalExpenses: {
        type: Number,
        set: (v: string): string => v.replace("$", ""),
    },
    nonOperationalExpenses: {
        type: Number,
        set: (v: string): string => v.replace("$", ""),
    },
});

const daySchema = new Schema({
    date: String,
    revenue: {
        type: Number,
        set: (v: string): string => v.replace("$", ""),
    },
    expenses: {
        type: Number,
        set: (v: string): string => v.replace("$", ""),
    },
});

const KPISchema = new Schema(
    {
        totalProfit: {
            type: Number,
            set: (v: string): string => v.replace("$", ""),
        },
        totalRevenue: {
            type: Number,
            set: (v: string): string => v.replace("$", ""),
        },
        totalExpenses: {
            type: Number,
            set: (v: string): string => v.replace("$", ""),
        },
        expensesByCategory: {
            type: Map,
            of: {
                type: Number,
                set: (v: string): string => v.replace("$", ""),
            },
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema],
    },
    { timestamps: true }
);

type KPIs = InferSchemaType<typeof KPISchema>;

const KPI = model<KPIs>("KPI", KPISchema);

export default KPI;
