import React, {useEffect, useState} from 'react';
import {Box, createTheme, Grid, MenuItem, Select, ThemeProvider} from "@mui/material";
import TopBar from "../component/TopNav";
import {useLocation, useNavigate} from "react-router-dom";
import testImg from "../images/test.png"
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {setSearchTrigger} from "../redux/actions";

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

const resultPerPage = 12; // 한 페이지에 출력될 갯수

function SearchResult(props) {

    const navigate = useNavigate();

    const dispatch = useDispatch();// redux dispatch

    const searchTrigger = useSelector((state) => state.searchTrigger); // 검색용 trigger

    const [load, setLoad] = useState(false); // 주소에서 가져올 값이 다 로드되었는지 체크

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [sort, setSort] = useState("인기순");

    const [result, setResult] = useState(null) // 검색결과

    // 리덕스에서 값 가져오기
    let keyword = useSelector((state) => state.searchKeyword)
    let people = useSelector((state) => state.searchPeople)
    let start = useSelector((state) => state.searchStart)
    let end = useSelector((state) => state.searchEnd)
    let loc = useSelector((state) => state.searchLocation)
    const [page, setPage] = useState(queryParams.get("page")) // 현재 페이지
    let type = useSelector((state) => state.searchType)

    const [pageArr, setPageArr] = useState([]) // 페이징 넘버링을 관리할 곳


    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // 검색 api 호출
    const search = async () => {
        const response = await axios.get(
            `http://localhost:8099/unauth/search/package?keyword=${keyword}&start=${dayjs(start).format('YYYY-MM-DD').toString()}&end=${dayjs(end).format('YYYY-MM-DD').toString()}&location=${loc}&people=${people}&sort=0&type=0&size=12`
        ).then((res) => {
            console.log(res.data);
            setResult(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    // 가이드 검색 api 호출
    const guideSearch = async () => {
        const response = await axios.get(
            `http://localhost:8099/unauth/search/guide?keyword=${keyword}&sort=0&type=0&size=12`
        ).then((res) => {
            console.log(res.data);
            setResult(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    // 페이지 넘버 관리
    const pageNum = () => {
        if(result){
            // 검색결과가 있을때만 수행
            let startPage = Math.floor((page - 1) / 10) * 10 + 1;
            let endPage = startPage + 9;
            if (endPage > result.count) endPage = result.count;

            let pageNumbers = [];
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            setPageArr(pageNumbers);
        }
    }


    // page state가 바뀔 때
    useEffect(() => {
        // 페이지와 api 호출 결과값이 바뀔 때마다 아래의 페이지 넘버 체킹
        pageNum();
    }, [], page, result)

    useEffect(() => {
        console.log(`keyword : ${keyword}, people : ${people}, start : ${start}, end=${end}, location : ${loc}, people : ${people}, sort : ${sort}, type : ${type}`)
        // 컴포넌트 최초 로드 시 검색 api 호출

        if(searchTrigger === true){ // 재로드 신호 들어왔을 때
            if(type === 0){
                // 패키지 검색 시
                search();
            }else if(type === 1){
                // 가이드 검색 시
                guideSearch();
            }
            // 모두 마친 후 false로 변경해서 다시 로드하지 않도록
            dispatch(setSearchTrigger(false))
            setPage(1); // 현재 페이지를 다시 1페이지로 이동시킴
        }

    },[searchTrigger])

    useEffect(() => {
        if(type === 0){
            // 패키지 검색 시
            search();
        }else if(type === 1){
            // 가이드 검색 시
            guideSearch();
        }
        // 모두 마친 후 false로 변경해서 다시 로드하지 않도록
        dispatch(setSearchTrigger(false))
        setPage(1); // 현재 페이지를 다시 1페이지로 이동시킴
    },[])

    return (
        <ThemeProvider theme={theme}>
            <TopBar/>
            {/* 최상위 Grid **/}
            <Grid container sx={{width:"100%", pt:"4rem", px:"20%", mt:"3rem"}}>
                {/* page title **/}
                <Grid item container xs={6} display={"flex"} justifyContent="flex-start" alignItems="center">
                    <Typography sx={{fontSize:"2rem", fontWeight:"700"}} fullWidth>검색결과</Typography>
                    {!result &&
                        <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"2rem"}}>
                            <Typography sx={{fontSize:"1.5rem", fontWeight:"700", color:"#A2A2A2"}} >검색결과가 없습니다.</Typography>
                        </Grid>
                    }
                    {result &&
                        <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"2rem"}}>
                            <Typography sx={{fontSize:"1.5rem", fontWeight:"700", color:"#A2A2A2"}} >{result.count}개의 검색 결과가 있습니다.</Typography>
                        </Grid>
                    }
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
                    {/* 투어 검색결과들 **/}
                    {type === 0 && result && result.content && result.content.map((item, idx) => {
                        return(
                            <Grid xs={4} md={3} container item display={"flex"} justifyContent="center" alignItems="center" onClick={() => navigate(`/tour/${item.tourId}`)} >
                                <Grid xs={12} container item display={"flex"} justifyContent="center" alignItems="center"
                                      sx={{border:2, borderColor:"#DDDDDD", borderRadius:"1vw", overflow:"hidden"}}>
                                    {/* 투어 이미지 **/}
                                    <Grid item xs={12} display={"flex"} justifyContent="center" alignItems="center">
                                        <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden"}}>
                                            <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                        </Box>
                                    </Grid>
                                    {/* 여행 제목 **/}
                                    <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"1rem", px:"1rem"}}>
                                        <Typography sx={{fontSize:"1.5rem", fontWeight:"900"}}>
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    {/* 가이드 사진 및 이름 **/}
                                    <Grid container item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{pb:"1rem", px:"1rem"}}>
                                        <Grid xs={1} item  display={"flex"} justifyContent="flex-start" alignItems="center">
                                            <Box sx={{width:"100%", aspectRatio:"1/1", borderRadius:"50vw", overflow:"hidden"}}>
                                                <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                            </Box>
                                        </Grid>
                                        <Grid xs={11} item  display={"flex"} justifyContent="flex-start" alignItems="center">
                                            <Typography sx={{fontSize:"1rem", fontWeight:"600"}}>{item.guideName}</Typography>
                                        </Grid>
                                    </Grid>
                                    {/* 리뷰점수 **/}
                                    <Grid  item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{pb:"1rem", px:"1rem"}}>
                                        <Typography sx={{fontWeight:"600"}}>{item.rating.toFixed(1)}</Typography>
                                        {item.rating > 4 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 3 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 2 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 1 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 0 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                    </Grid>
                                    {/* 가격 **/}
                                    <Grid  item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{pb:"1rem", px:"1rem"}}>
                                        <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>{item.price}원</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                    {/* 가이드 검색결과들 **/}
                    {type === 1 && result && result.contentGuides && result.contentGuides.map((item, idx) => {
                        return(
                            <Grid xs={4} md={3} container item display={"flex"} justifyContent="center" alignItems="center">
                                <Grid xs={12} container item display={"flex"} justifyContent="center" alignItems="center"
                                      sx={{border:2, borderColor:"#DDDDDD", borderRadius:"1vw", overflow:"hidden"}}>
                                    {/* 가이드 이미지 **/}
                                    <Grid item xs={12} display={"flex"} justifyContent="center" alignItems="center">
                                        <Box sx={{width:"100%", aspectRatio:"16/9", overflow:"hidden"}}>
                                            <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                        </Box>
                                    </Grid>
                                    {/* 가이드 이름 **/}
                                    <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{py:"1rem", px:"1rem"}}>
                                        <Typography sx={{fontSize:"1.5rem", fontWeight:"900"}}>
                                            {item.guideName}
                                        </Typography>
                                    </Grid>
                                    {/* 리뷰점수 **/}
                                    <Grid  item xs={12} display={"flex"} justifyContent="flex-start" alignItems="center" sx={{pb:"1rem", px:"1rem"}}>
                                        <Typography sx={{fontWeight:"600"}}>{item.rating.toFixed(1)}</Typography>
                                        {item.rating > 4 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 3 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 2 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 1 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                        {item.rating > 0 && (
                                            <StarIcon sx={{ color: '#F2D857', fontSize: '1.3rem' }}/>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                    {/* paging **/}
                </Grid>
                <Grid xs={12} container item sx={{py:"3rem", px:{xs:"3%", md:"20%", lg:"40%"}}} display={"flex"} justifyContent={"center"} alignContent={"center"} spacing={3}>
                    {/* 총 검색결과에서 현재페이지 **/}
                    {pageArr && pageArr.map((item, idx) => {
                        return(
                            <Grid xs={12} item>
                                <Typography onClick={(e) => setPage(e.target.value)}>{item}</Typography>
                            </Grid>
                        )
                    })}
                </Grid>

            </Grid>
        </ThemeProvider>
    );
}

export default SearchResult;