import React, {useEffect, useState} from 'react';
import testImg from "../images/test.png";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button, Checkbox, Collapse,
    createTheme, Divider, FormControlLabel,
    Grid, Radio, RadioGroup,
    TextField,
    ThemeProvider
} from "@mui/material";
import TopBar from "../component/TopNav";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// 더미 json
const reviews = [
    {
        memberId : 100,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
    },
    {
        memberId : 200,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
    },
    {
        memberId : 300,
        tourId : 1,
        rating : 5,
        content : "내용입니다 내용내용",
        createdDay : "2020-03-28",
    },
]

function MyReview(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <Grid content item xs={12}>

        </Grid>
    );
}

export default MyReview;