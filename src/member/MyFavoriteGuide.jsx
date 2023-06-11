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
import FaceIcon from "@mui/icons-material/Face6";
import StarIcon from "@mui/icons-material/Star";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// 더미 json
const reviews = [
    {
        guideId : 1,
        tourThumb : testImg,
        guideName : "가이드1",
        sub : 33
    },
    {
        guideId : 2,
        tourThumb : testImg,
        guideName : "가이드2",
        sub : 33
    },
    {
        guideId : 3,
        tourThumb : testImg,
        guideName : "가이드3",
        sub : 33
    },
]

function MyFavoriteGuide(props) {

    const accessToken = useSelector((state) => state.accessToken);

    const navigate = useNavigate();

    const [page, setPage] = useState(1); // page

    const [result, setResult] = useState(null) // 결과 담을 곳

    const [lastPage, setLastPage] = useState(false); // 마지막 페이지에 도달했는지 체크

    const [load, setLoad] = useState(false); // 로드중 여부

    // 내가 좋아요 누른 가이드 가져오기 api
    const getGuideList = async (newPage) => {
        setLoad(true)
        const response = await axios.get(
            `http://localhost:8099/member/member/favoriteguide?page=${newPage}`,
            {headers:{'Authorization': `${accessToken}`,}}
        ).catch((err) => console.log).then(
            (res) => {
                console.log(res);
                // 페이징
                if(!result || newPage === 1){
                    setResult(res.data)
                }else if(result){
                    setResult({count:result.count, review: result.reviews.push(res.data.review)})
                }
                if(!result || (result && result.data.length < 10)){
                    setLastPage(true);
                }
            }
        )
        setLoad(false);
    }

    // 좋아요 취소 - api 만들어지면 수정
    const cancelFavorite = async (id) => {
        setLoad(true)
        const response = await axios.post(
            `http://localhost:8099/member/heart/cancel?`,
            {
                guideId : id,
            },
            {headers:{'Authorization': `${accessToken}`,}}
        )
        for(let i = 1; i <= page; i++){
            await getGuideList(i)
        }
        setLoad(false);
    }

    useEffect(() => {
        if(!accessToken){
        }else{
            getGuideList(1);
        }
    }, [, accessToken])

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    return (
        <Grid container item xs={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
        >
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    관심 가이드
                </Typography>
            </Grid>
            <Grid container item
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  xs={12} sx={{ overflow: 'auto'}}
                  spacing={2}
            >
                {/* items **/}
                {result && result.map((items) => {
                    return(
                        <Grid
                            container
                            item xs={3}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid
                                container
                                item xs={12}
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{border:2, borderRadius:"1vw" ,borderColor: "#DDDDDD",py:"3rem"}}
                            >
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{px:"30%"}}
                                      onClick={() => navigate(`/guideInfo/${items.guideId}`)}
                                >
                                    <Box sx={{width:"100%", aspectRatio:"1/1", borderRadius:"30vw", overflow:"hidden"}}>
                                        <img src={testImg} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                    </Box>
                                </Grid>
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{mt:"2rem"}}
                                >
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>
                                        {items.guideName}
                                    </Typography>
                                </Grid>
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{mt:"0.5rem"}}
                                >
                                    <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>
                                        구독자 {items.favorite} 명
                                    </Typography>
                                </Grid>
                                <Grid xs={12}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{mt:"2rem", px:"30%"}}
                                >
                                    <Button fullWidth sx={{border:2, borderColor:"#DDDDDD", borderRadius:"50vw"}}>
                                        <Typography sx={{fontSize:"0.7rem", fontWeight:"700", color:"#000000"}}>구독취소</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid xs={12} item sx={{mt:'1vw', mb:'7vw'}}>
                {lastPage === false && (
                    <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}>
                        <Typography sx={{color:"#000000"}}>투어 더보기</Typography>
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}

export default MyFavoriteGuide;