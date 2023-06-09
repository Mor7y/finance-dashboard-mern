import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
    useGetKpisQuery,
    useGetProductsQuery,
    useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transcationsData } = useGetTransactionsQuery();
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[500]];

    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        { name: key, value: value },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value,
                        },
                    ];
                }
            );
        }
    }, [kpiData]);

    console.log(pieChartData);

    const productColumns = [
        { field: "_id", headerName: "id", flex: 1 },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridRenderCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridRenderCellParams) => `$${params.value}`,
        },
    ];
    const transactionColumns = [
        { field: "_id", headerName: "id", flex: 1 },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
            renderCell: (params: GridRenderCellParams) => params.value,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridRenderCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.35,
            renderCell: (params: GridRenderCellParams) => params.value.length,
        },
    ];

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    sideText={`${productData?.length} products`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[400],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            bordedrBottom: `1px solidd ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            bordedrBottom: `1px solidd ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparatir": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                        getRowId={(row) => row._id}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${transcationsData?.length} lates transactions`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[400],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            bordedrBottom: `1px solidd ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            bordedrBottom: `1px solidd ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparatir": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transcationsData || []}
                        columns={transactionColumns}
                        getRowId={(row) => row._id}
                    />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="i">
                <BoxHeader
                    title="Expense Breakdown by Category"
                    sideText="+4%"
                />
                <FlexBetween>
                    {pieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`}>
                            <PieChart width={110} height={100}>
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={38}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={pieColors[index]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="j"></DashboardBox>
        </>
    );
};

export default Row3;
