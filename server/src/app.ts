import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions, Model } from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";
import kpiRoutes from "./routes/kpi";
import KPI from "./models/KPI";
import Product from "./models/Product";
import Transaction from "./models/Transactions";
import transactionRoutes from "./routes/transaction";
import productRoutes from "./routes/product";
import { kpis, products, transactions } from "./data";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

const PORT = process.env.PORT || 9000;

async function checkAndCreateCollections() {
    if (!process.env.MONGO_URL_STRING) {
        throw new Error("Invalid MongoDB URL");
    }

    try {
        await mongoose.connect(process.env.MONGO_URL_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

        const createIfEmpty = async <T>(model: Model<T>, data: unknown[]) => {
            const documentsCount = await model.countDocuments();
            if (documentsCount === 0) {
                await model.create(data);
            }
        };

        await createIfEmpty(KPI, kpis);
        await createIfEmpty(Product, products);
        await createIfEmpty(Transaction, transactions);

        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    } catch (err) {
        console.log(`${err} did not connect`);
    }
}

checkAndCreateCollections();
