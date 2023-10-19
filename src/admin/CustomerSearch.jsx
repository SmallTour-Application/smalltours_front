import React, {useEffect, useState} from 'react';
import {Button, Checkbox, FormControlLabel, Grid, Radio, RadioGroup, Typography} from "@mui/material";

function CustomerSearch(props) {

    // states
    const [role, setRole] = useState([]); // 기본값은 빈배열. 0:일반회원 1:미인증가이드 2:가이드 3:관리자


    // role checkbox에서 배열로 state에 넣어줄 func
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setRole(prev => [...prev, event.target.name]);
        } else {
            setRole(prev => prev.filter(item => item !== event.target.name));
        }
    };

    useEffect(() => {
        // role 변화를 테스트합니다.
        console.log(role)
    }, [role])


    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem"}}>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>회원검색</Typography>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                <Button
                    sx={{
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '10px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                >
                    <Typography>회원 추가</Typography>
                </Button>
                <Button
                    sx={{
                        ml:"1rem",
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '10px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                >
                    <Typography>선택회원 메일 발송</Typography>
                </Button>
            </Grid>
            {/* 회원타입 **/}
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    <b style={{fontSize:"1.3rem", fontWeight:"600"}}>회원타입</b>
                        <Checkbox
                            name={0}
                            value={0}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        일반회원
                        <Checkbox
                            name={1}
                            value={1}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        미인증가이드
                        <Checkbox
                            name={2}
                            value={2}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        가이드
                        <Checkbox
                            name={3}
                            value={3}
                            onChange={handleCheckboxChange}
                            sx={{ml:"1rem"}}
                        />
                        관리자
                </Typography>
                <Button
                    sx={{
                        ml:"2rem",
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '3px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                >
                    <Typography>메일 발송</Typography>
                </Button>
            </Grid>
            {/* 가입기간 **/}
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>

            </Grid>
        </Grid>
    );
}

export default CustomerSearch;