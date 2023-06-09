export interface KPIResponse {
    _id: string;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: Map<string, number>;
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

export interface ProductsResponse {
    _id: string;
    price: number;
    expense: number;
    transaction: string[];
}

export interface TransactionResponse {
    _id: string;
    buyer: string;
    amount: number;
    productIds: string[];
}
