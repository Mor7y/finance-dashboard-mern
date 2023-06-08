import DashboardBox from "@/components/DashboardBox";
import { useGetTransactionsQuery } from "@/state/api";

const Row3 = () => {
    const { data: transcationsData } = useGetTransactionsQuery();
    console.log(useGetTransactionsQuery());
    console.log({ data: transcationsData });
    return (
        <>
            <DashboardBox gridArea="g"></DashboardBox>
            <DashboardBox gridArea="h"></DashboardBox>
            <DashboardBox gridArea="i"></DashboardBox>
            <DashboardBox gridArea="j"></DashboardBox>
        </>
    );
};

export default Row3;
