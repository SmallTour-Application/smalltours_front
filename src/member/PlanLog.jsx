import React, {useState} from 'react';
import testImg from "../images/test.png";
import {
    Box,

    Button,
    createTheme,
    Grid, Modal, TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";


// modal에 적용할 style
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"1vw",
};

function PlanLog(props) {

    const theme = createTheme({ // Theme
        typography: {
            fontFamily: 'NanumSquareNeo',
        },
    });

    // modal용 state
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [reviewType, setReviewType] = useState(false); // f:일반리뷰 t:가이드리뷰

    const [star, setStar] = useState(5); // 별갯수

    return (
        <Grid content item xs={12}>
            {/* 리뷰용 modal **/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} >
                    <Grid container sx={{width:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"2rem"}}>
                            {reviewType === false && (
                                <Typography id="modal-modal-description" fullWidth sx={{ fontSize:"1.5rem", fontWeight:"900" }}>
                                    여행리뷰
                                </Typography>
                            )}
                            {reviewType === true && (
                                <Typography id="modal-modal-description" fullWidth sx={{ fontSize:"1.5rem", fontWeight:"900" }}>
                                    가이드 리뷰
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Typography sx={{fontSize:"1rem", fontWeight:"700"}}>
                                여행이름
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"1rem"}}>
                            <Typography sx={{fontSize:"0.7rem", fontWeight:"700", fontColor:"#8D8D8D"}}>
                                가이드명
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mb:"2rem"}}>
                            <StarIcon sx={{ color: star > 0 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(1)}/>
                            <StarIcon sx={{ color: star > 1 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(2)}/>
                            <StarIcon sx={{ color: star > 2 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(3)}/>
                            <StarIcon sx={{ color: star > 3 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(4)}/>
                            <StarIcon sx={{ color: star > 4 ? "#6CB0FF" : "#888888", fontSize: '2rem' }} onClick={() => setStar(5)}/>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                multiline
                                rows={7}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{mt:"2rem"}}>
                            <Button fullWidth sx={{backgroundColor:"#6CB0FF", border:0, borderRadius:"2vw", height:"200%"}}>
                                <Typography sx={{color:"#FFFFFF"}}>
                                    작성완료
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            {/* modal 끝 **/}

            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>
                    여행기록
                </Typography>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent="flex-start" alignItems={"center"} sx={{mb: "2rem"}}>
                <Typography sx={{fontSize: "1rem", fontWeight: "700", color:"#888888"}}>
                    2건의 여행 기록이 있어요
                </Typography>
            </Grid>
            <Grid container item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12}
            >

                {/* item 1 **/}
                <Grid container item
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      xs={12} sx={{border: 1,borderRadius:"1vw", borderColor: "#DDDDDD", overflow: 'hidden', p:0, mb:"2rem"}}>
                    <Grid xs={3} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{height:"100%"}}
                    >
                        <Box sx={{width:"100%", height:"100%", display: "flex", overflow:"hidden", p:0}}>
                            <img src={testImg} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center"}}/>
                        </Box>
                    </Grid>
                    <Grid xs={6} item container
                          display={"flex"}
                          justifyContent={"flex-start"}
                          alignItems={"center"}
                          sx={{pl:"1rem"}}
                    >
                        <Grid xs={12} item sx={{mb:"1rem"}}>
                            <span style={{fontFamily: 'NanumSquareNeo', fontWeight:"700", fontSize:"1.3rem", marginRight:"1rem"}}>여행완료</span>
                            <span style={{fontFamily: 'NanumSquareNeo',color:"#888888", fontSize:"1rem"}}>5월 13일 ~ 5월 17일</span>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1.3rem", fontWeight:"700"}}>싱가포르 5,6일 #1일 자유 #슈퍼트리쇼 #루지 체험</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>김용식 가이드</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{mt:"1rem"}}>
                            <Typography sx={{fontWeight:"700"}}>799,000원</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={3} item container
                          display={"flex"}
                          justifyContent={"flex-end"}
                          alignItems={"center"}
                          spacing={2}
                    >
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth onClick={() => {
                                setReviewType(false);
                                handleOpen();
                            }}>
                                <Typography sx={{color:"#000000"}}>리뷰 작성</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth onClick={() => {
                                setReviewType(true);
                                handleOpen();
                            }}>
                                <Typography sx={{color:"#000000"}}>가이드 리뷰 작성</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {/* item 2 **/}
                <Grid container item
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      xs={12} sx={{border: 1,borderRadius:"1vw", borderColor: "#DDDDDD", overflow: 'hidden', p:0}}>
                    <Grid xs={3} item
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{height:"100%"}}
                    >
                        <Box sx={{width:"100%", height:"100%", display: "flex", overflow:"hidden", p:0}}>
                            <img src={testImg} style={{width:"100%", height: "100%", objectFit:"cover", objectPosition:"center center"}}/>
                        </Box>
                    </Grid>
                    <Grid xs={6} item container
                          display={"flex"}
                          justifyContent={"flex-start"}
                          alignItems={"center"}
                          sx={{pl:"1rem"}}
                    >
                        <Grid xs={12} item sx={{mb:"1rem"}}>
                            <span style={{fontFamily: 'NanumSquareNeo', fontWeight:"700", fontSize:"1.3rem", marginRight:"1rem"}}>여행완료</span>
                            <span style={{fontFamily: 'NanumSquareNeo',color:"#888888", fontSize:"1rem"}}>5월 13일 ~ 5월 17일</span>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1.3rem", fontWeight:"700"}}>싱가포르 5,6일 #1일 자유 #슈퍼트리쇼 #루지 체험</Typography>
                        </Grid>
                        <Grid xs={12} item>
                            <Typography sx={{fontSize:"1rem", fontWeight:"700", color:"#888888"}}>김용식 가이드</Typography>
                        </Grid>
                        <Grid xs={12} item sx={{mt:"1rem"}}>
                            <Typography sx={{fontWeight:"700"}}>799,000원</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={3} item container
                          display={"flex"}
                          justifyContent={"flex-end"}
                          alignItems={"center"}
                          spacing={2}
                    >
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth onClick={() => {
                                setReviewType(false);
                                handleOpen();
                            }}>
                                <Typography sx={{color:"#000000"}}>리뷰 작성</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ px:"3rem"}}>
                            <Button variant={"outlined"} sx={{borderColor:"#DDDDDD"}} fullWidth onClick={() => {
                                setReviewType(true);
                                handleOpen();
                            }}>
                                <Typography sx={{color:"#000000"}}>가이드 리뷰 작성</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>



            <Grid xs={12} item sx={{pt:'1vw',}}>
                <Button variant="outlined" fullWidth sx={{borderColor:'#DDDDDD', borderRadius:'10px'}}>
                    <Typography sx={{color:"#000000"}}>예약일정 더보기</Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default PlanLog;