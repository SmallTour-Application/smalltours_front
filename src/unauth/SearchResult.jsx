import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import TopBar from "../component/TopNav";

function SearchResult(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
        </ThemeProvider>
    );
}

export default SearchResult;