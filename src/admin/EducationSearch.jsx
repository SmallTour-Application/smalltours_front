import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Button,
    FormControlLabel,
    Grid, LinearProgress, Modal, Pagination,
    Paper,
    Radio,
    RadioGroup, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Box} from "@mui/system";

function EducationSearch(props) {
    // Video 추가용 modal
    const [videoOpen, setVideoOpen] = useState(false);
    const [videoFile, setVideoFile] = useState(null); // 동영상 파일
    const [uploadProgress, setUploadProgress] = useState(0);
    const [progress, setProgress] = useState(0); // 진행률 상태 관리
    const [fileName, setFileName] = useState(''); // 파일명을 저장할 state



    const handleVideoClose = () => {
        setVideoOpen(false);
    }



    const defaultSize = 10; // 한 페이지에 보여줄 아이템의 수
    // accessToken

    const [result, setResult] = React.useState(null);
    const [totalCnt, setTotalCnt] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [sort, setSort] = useState(0); // sort 0: 미결제, 1: 결제, 2: 취소

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    const location = useLocation();
    const navigate = useNavigate();

    // 현재의 URL 파라미터를 가져옵니다.
    const params = new URLSearchParams(location.search);

    const getReservationList = async(page, title,startDate, endDate) => { // date들은 getElementsById로 가져옵니다.
        console.log("예약 정보를 가져옵니다...")
        console.log(`${process.env.REACT_APP_API_URL}/admin/education/list?startDate=${startDate}&endDate=${endDate}&title=${title}&page=${page}&size=${defaultSize}`)
        let url = `${process.env.REACT_APP_API_URL}/admin/education/list?page=${page}&size=${defaultSize}`;
        if(title !== "" && title !== null){
            url += `&title=${title}`;
        }
        if(startDate !== "" && startDate !== null){
            url += `&startDate=${startDate}`;
        }
        if(endDate !== "" && endDate !== null){
            url += `&endDate=${endDate}`;
        }
        const response = await axios.get(
            url,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            if(res && res.data){
                console.log(res);
                setResult(res.data.educationList);
                setTotalCnt(res.data.count);
            }
        }).catch((err) => console.log(err))
    }

    /**
     * 교육 추가 /admin/upload/education/video
     * */
    const addVideo = async (endDay, startDay, title) => {
        console.log("동영상을 추가합니다...")
        const formData = new FormData();
        formData.append("videoFile", videoFile[0]);
        formData.append("title", title);
        formData.append("startDay", startDay);
        formData.append("endDay", endDay);
        const config = {
            // 업로드 중의 진행 상황을 추적하는 이벤트 핸들러
            onUploadProgress: function(progressEvent) {
                // progressEvent.loaded: 현재까지 업로드된 바이트
                // progressEvent.total: 전체 업로드할 바이트
                // 위 두 값을 사용하여 업로드 진행률을 백분율로 계산
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                // setProgress 함수로 업로드 진행률을 상태에 업데이트
                setProgress(percentCompleted);
            },
            headers: {
                // 요청 헤더에 'multipart/form-data' 타입을 지정하여,
                // 서버에 파일과 함께 다른 데이터도 전송할 수 있도록 설정
                'Content-Type': 'multipart/form-data',

                // Authorization 헤더에 토큰 값을 포함시켜 인증 정보를 전송
                Authorization: `${accessToken}`
            }
        };
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/admin/upload/education/video`,
            formData,
            config
        ).then((res) => {
            console.log(res);
            setProgress(100);
        }).catch((err) => console.log(err))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentLoaded = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(percentLoaded);
            }
        };

        reader.onloadend = () => {
            setVideoFile(file);
            setFileName(file.name);
        };

        reader.readAsDataURL(file);
    };

    // Video add modal body
    const newVideoBody = (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                maxWidth: 400,
                bgcolor: 'background.paper',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
            }}
        >
            <h2>영상 추가</h2>
            <Grid container sx={{width:"100%"}}>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center" sx={{py:"1rem"}}>
                    <Typography sx={{fontWeight:"700", fontSize:"1rem"}}>제목</Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center">
                    <TextField fullWidth label="입력" id={"educationTitle"} variant="outlined"
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center" sx={{py:"1rem"}}>
                    <Typography sx={{fontWeight:"700", fontSize:"1rem"}}>교육기간</Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center">
                    <TextField type={"date"} id={"educationStart"} label={"시작일"} fullWidth
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                    <TextField type={"date"} id={"educationEnd"} label={"종료일"} fullWidth
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center" sx={{py:"1rem"}}>
                    <Typography sx={{fontWeight:"700", fontSize:"1rem"}}>영상 파일</Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            background: '#0B401D',
                            borderRadius: '10px',
                            '&:hover': {
                                background: "green",
                            }
                        }}
                    >
                        <Typography sx={{ color: "#FFFFFF" }}>파일업로드</Typography>
                        <input
                            accept={"video/*"}
                            type="file"
                            hidden
                            onChange={(e) => {
                                setVideoFile(e.target.files);
                                setFileName(e.target.files[0].name); // 파일 이름 설정
                            }}
                        />
                    </Button>
                    <div>
                        {uploadProgress > 0 && (
                            <div>
                                <progress value={uploadProgress} max="100"></progress>
                                {uploadProgress}% uploaded
                            </div>
                        )}
                    </div>
                </Grid>
                {fileName &&
                    (
                        <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="center">
                            <Typography variant="body2" sx={{ marginTop: 2 }}>{fileName}</Typography>
                        </Grid>
                    )
                }
            </Grid>
            <Grid item xs={12}>
                {progress > 0 && progress < 100 && (
                    <LinearProgress variant="determinate" value={progress} />
                )}
            </Grid>
            <Box mt={2}>
                <Button color="primary"
                        onClick={() => {
                            console.log(videoFile);
                            console.log("동영상업로드 수행...")
                            if(videoFile && videoFile !== null && document.getElementById("educationEnd").value !== "" && document.getElementById("educationStart").value !== "" && document.getElementById("educationTitle").value !== ""){
                                addVideo(document.getElementById("educationEnd").value, document.getElementById("educationStart").value, document.getElementById("educationTitle").value).then((res) => {
                                    // Textfield들과 state들 초기화
                                    document.getElementById("educationEnd").value = "";
                                    document.getElementById("educationStart").value = "";
                                    document.getElementById("educationTitle").value = "";
                                    setVideoFile(null);
                                    // modal 닫기
                                    handleVideoClose();
                                }).catch((res) => {alert("동영상 업로드 실패")})

                            }else if(!videoFile) {
                                alert("동영상 파일을 선택해주세요")
                            }
                        }}
                >확인</Button>
                <Button onClick={handleVideoClose} color="secondary" sx={{ ml: 1 }}>취소</Button>
            </Box>
        </Box>
    );

    return (
        <Grid container sx={{width:"100%", display:"flex", mt:"3rem", px:"3rem"}}>
            {/* New Video Modal **/}
            <Modal
                open={videoOpen}

                onClose={handleVideoClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {newVideoBody}
            </Modal>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <Typography sx={{fontSize:"2rem", fontWeight:"700"}}>교육검색</Typography>
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
                    onClick={() => {
                        //modal
                        setVideoOpen(true);
                    }}
                >
                    <Typography>교육 추가</Typography>
                </Button>
            </Grid>

            {/* 제목 **/}
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    제목
                    <TextField id={"title"} variant={"outlined"} size={"small"}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    시작일
                    <TextField id={"startDateTextField"} variant={"outlined"}
                               type="date" // <-- 여기서 type을 "date"로 설정
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Typography sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    종료일
                    <TextField id={"endDateTextField"} variant={"outlined"}
                               type="date" // <-- 여기서 type을 "date"로 설정
                               InputLabelProps={{
                                   shrink: true, // 이 속성은 날짜 선택기의 레이블이 항상 위로 올라가게 합니다.
                               }}
                               sx={{
                                   ml:"1rem",
                                   height: '30px', // 높이 지정
                                   '& .MuiOutlinedInput-root': {
                                       height: '100%', // 높이를 100%로 지정하여 TextField의 높이와 동일하게 만듭니다.
                                   }
                               }}
                    />
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                <Button
                    sx={{
                        backgroundColor: 'skyblue', // 버튼의 배경색을 하늘색으로 설정합니다.
                        ':hover': {
                            backgroundColor: 'deepskyblue', // 마우스 오버시 버튼의 배경색을 조금 더 진한 하늘색으로 설정합니다.
                        },
                        color: 'white', // 버튼의 텍스트 색상을 흰색으로 설정합니다.
                        padding: '5px 20px', // 버튼의 패딩을 설정합니다.
                        borderRadius: '5px', // 버튼의 모서리를 둥글게 만듭니다.
                    }}
                    onClick={() => {
                        // 시작일이 종료일보다 늦을 경우 경고창을 띄웁니다.
                        if(document.getElementById("startDateTextField").value > document.getElementById("endDateTextField").value){
                            alert("시작일이 종료일보다 늦을 수 없습니다.");
                            return;
                        }
                        // 날짜가 하나만 입력되지 않은 경우 경고창을 띄움
                        if((document.getElementById("startDateTextField").value !== "" && document.getElementById("endDateTextField").value === "") || (document.getElementById("startDateTextField").value === "" && document.getElementById("endDateTextField").value !== "") ){
                            alert("날짜를 입력해주세요.");
                            return;
                        }
                        // 날짜가 둘다 입력되지 않은 경우 날짜 파라미터에 null을 넣어서 검색합니다.
                        if(document.getElementById("startDateTextField").value === "" && document.getElementById("endDateTextField").value === ""){
                            getReservationList(0, document.getElementById("title").value, null, null);
                            // page를 1로 초기화합니다.
                            params.set("page", 0);
                            return;
                        }else {
                            getReservationList(0, document.getElementById("title").value, document.getElementById("startDateTextField").value, document.getElementById("endDateTextField").value);
                        }
                        // page를 1로 초기화합니다.
                        params.set("page", 0);
                    }}
                >
                    <Typography>검색</Typography>
                </Button>
            </Grid>


            {/* 이 아래는 검색 후에만 보이게 합니다. **/}

            <Grid container item xs={12}>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mb:"1rem", mt:"3rem"}}>
                    <Typography sx={{fontSize:"2rem", fontWeight:"700", display:"inline"}}>검색결과</Typography>
                    <Typography sx={{fontSize:"1.3rem", fontWeight:"700", display: 'inline', color:"gray", ml:"1rem"}}>{totalCnt}건</Typography>
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", mt:"1rem"}}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>번호</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell>시작일</TableCell>
                                    <TableCell>종료일</TableCell>
                                    <TableCell>재생시간</TableCell>
                                    <TableCell>상태</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result && result.map((item, idx) => {
                                    return(
                                        <TableRow onClick={() => navigate(`/admin/education/info/${item.id}`)}>
                                            {/*id**/}
                                            <TableCell>{idx}</TableCell>
                                            <TableCell>{item.educationTitle}</TableCell>
                                            <TableCell>{item.startDay}</TableCell>
                                            <TableCell>{item.endDay}</TableCell>
                                            <TableCell>{item.playTime}</TableCell>
                                            <TableCell>{item.state === 1 ? "수강가능" : "수강불가"}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {totalCnt >= defaultSize && (
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: "1rem" }}>
                        <Pagination count={Math.ceil(totalCnt / defaultSize)} page={page + 1} onChange={(event, newPage) => {
                            setPage(newPage - 1);
                        }} />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default EducationSearch;