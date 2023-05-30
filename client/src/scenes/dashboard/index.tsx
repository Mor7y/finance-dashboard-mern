import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

const gridTemplate = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"`;

const Dashboard = () => {
    // const { palette } = useTheme();
    return (
        <Box
            width="100%"
            height="100%"
            gap="1.5rem"
            display="grid"
            sx={{
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplate,
            }}
        >
            <Box bgcolor="#fff" gridArea="a"></Box>
            <Box bgcolor="#fff" gridArea="b"></Box>
            <Box bgcolor="#fff" gridArea="c"></Box>
            <Box bgcolor="#fff" gridArea="d"></Box>
            <Box bgcolor="#fff" gridArea="e"></Box>
            <Box bgcolor="#fff" gridArea="f"></Box>
            <Box bgcolor="#fff" gridArea="g"></Box>
            <Box bgcolor="#fff" gridArea="h"></Box>
            <Box bgcolor="#fff" gridArea="i"></Box>
            <Box bgcolor="#fff" gridArea="j"></Box>
        </Box>
    );
};

export default Dashboard;
