import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';

export default function Confirm() {
    const token = useParams().token;
    const navigate = useNavigate();

    const confirm = async () => {
        const response = await axios.get(
            `http://localhost:8099/unauth/member/confirm-email?token=${token}`
        );
        alert("가입을 축하드립니다.")
        navigate("/login")
    };

    useEffect(() => {
        if(token){
            confirm();
        }
    }, [,token]);

    return (
        <Box>
            <Typography>가입을 축하드립니다!!!</Typography>
        </Box>
    );
}
