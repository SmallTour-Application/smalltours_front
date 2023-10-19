import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, AppBar, Toolbar, createTheme, ThemeProvider} from '@mui/material';
import Sidebar from "./component/Sidebar";

const Dashboard = () => {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* Main Content */}
                    Welcome to the Dashboard!
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard;