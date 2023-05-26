import React, {useState} from 'react';
import {Box, createTheme, Grid, MenuItem, Select, ThemeProvider} from "@mui/material";
import TopBar from "../component/TopNav";
import {useLocation} from "react-router-dom";
import testImg from "../images/test.png"
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

// 더미데이터
const temp = {
    count:30, // 검색결과 갯수
    content:[
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행1",
            subTitle : "여행1 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행2",
            subTitle : "여행2 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행3",
            subTitle : "여행3 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행1",
            subTitle : "여행1 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행2",
            subTitle : "여행2 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행3",
            subTitle : "여행3 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행1",
            subTitle : "여행1 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행2",
            subTitle : "여행2 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
        {
            thumb : testImg, // 썸네일 이미지 경로
            title : "여행3",
            subTitle : "여행3 서브",
            rating : "4.8",
            price : 300000,
            guideImg : testImg, // 가이드 이미지 경로
            guideName : "김용식" // 가이드이름
        },
    ]
}

function SearchResult(props) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [sort, setSort] = useState("인기순");

    const [result, setResult] = useState(null) // 검색결과

    // 주소에서 값 가져오기
    const keyword = queryParams.get('keyword'); // 키워드
    const people = queryParams.get("people"); // 최소인원
    const start = queryParams.get("start"); // 출발일
    const end = queryParams.get("end"); // 도착일
    const loc = queryParams.get("loc") // 여행지역
    const page = queryParams.get("page") // 현재 페이지


    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // 검색 api 호출
    const search = async () => {
        const response = await axios.get(
            `http://localhost:8099/unauth/search/package`,
            {
                start : start,
                end : end,
                location : loc,
                people : people,
                sort : 0,
                type : 0,
                keyword : keyword
            }
        ).then((res) => {
            setResult(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%", pt:"4rem", px:"20%"}}>
                {/* page title **/}
                <Grid item xs={6} display={"flex"} justifyContent="flex-start" alignItems="center">
                    <Typography sx={{fontSize:"2rem", fontWeight:"700"}} >검색결과</Typography>
                </Grid>
                {/* sort option **/}
                <Grid item xs={6} display={"flex"} justifyContent="flex-end" alignItems="center">
                    <Select
                        onChange={(e) => setSort(e.target.value)}
                        label="정렬"
                        defaultValue={sort}
                    >
                        <MenuItem value="인기순">인기순</MenuItem>
                        <MenuItem value="최신순">최신순</MenuItem>
                        <MenuItem value="평점순">평점순</MenuItem>
                    </Select>
                </Grid>

                <Grid xs={12} item container spacing={3} sx={{mt:"2rem"}}>
                    {/* 검색결과들 **/}
                    {temp && temp.content && temp.content.map((item, idx) => {
                        return(
                            <Grid xs={4} md={3} container item display={"flex"} justifyContent="center" alignItems="center">
                                <Grid xs={12} container item display={"flex"} justifyContent="center" alignItems="center"
                                      sx={{border:1, borderColor:"#8D8D8D", borderRadius:"1vw", p:"1rem"}}>
                                    {/* 투어 이미지 **/}
                                    <Grid item xs={12} display={"flex"} justifyContent="center" alignItems="center">
                                        <Box sx={{width:"100%", aspectRatio:"16/9", borderRadius:"1vw", overflow:"hidden"}}>
                                            <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                        </Box>
                                    </Grid>
                                    {/* 여행 제목 **/}
                                    <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"0.1rem"}}>
                                        <Typography>
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    {/* 가이드 사진 및 이름 **/}
                                    <Grid container item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"0.1rem"}}>
                                        <Grid xs={1} item  display={"flex"} justifyContent="flex-start" alignItems="center">
                                            <Box sx={{width:"100%", aspectRatio:"1/1", borderRadius:"50vw", overflow:"hidden"}}>
                                                <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                            </Box>
                                        </Grid>
                                        <Grid xs={11} item  display={"flex"} justifyContent="flex-start" alignItems="center">
                                            <Typography>{item.guideName}</Typography>
                                        </Grid>
                                    </Grid>
                                    {/* 리뷰점수 **/}
                                    <Grid  item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"0.1rem"}}>
                                        {item.rating > 4 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1rem' }}/>
                                        )}
                                        {item.rating > 3 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1rem' }}/>
                                        )}
                                        {item.rating > 2 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1rem' }}/>
                                        )}
                                        {item.rating > 1 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1rem' }}/>
                                        )}
                                        {item.rating > 0 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1rem' }}/>
                                        )}
                                        <Typography>{item.rating}</Typography>
                                    </Grid>
                                    {/* 가격 **/}
                                    <Grid  item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"0.1rem"}}>
                                        <Typography>{item.price}원</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>


            </Grid>
        </ThemeProvider>
    );
}

export default SearchResult;