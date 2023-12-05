import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import {ResponsiveBar} from "@nivo/bar";
import {Button, Grid, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

function GuideStat(props) {
    // accessToken 가져오기
    const accessToken = useSelector((state) => state.accessToken);

    // 시작일은 1년 전
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'year'))
    // 종료일은 오늘
    const [endDate, setEndDate] = useState(dayjs());

    const [results, setResults] = useState(null); // 결과담을 state

    const [topResult, setTopResult] = useState(null); // 결과담을 state

    // 가이드 통계 가져오기
    const getGuideStat = async(start, end) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/stats/view`,
            {
                startDate: start.format('YYYY-MM-DD'),
                endDate: end.format('YYYY-MM-DD'),
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
        ).then((res) => {
            console.log(res);
            if(res && res.data){
                // 데이터 형식 변환
                const chartData = res.data.statsToursDTOList.map(tour => ({
                    title: tour.title,
                    salesRevenue: tour.salesRevenue
                }));
                setResults(chartData);
                setTopResult(res.data)
            }
        }).catch((err) => console.log(err))
        return response;
    }

    useEffect(() => {
        if(accessToken){
            getGuideStat(startDate, endDate);
        }
    },[accessToken])

    return (
        <Grid container sx={{ width:"100%"}}>
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" color="skyblue">가이드 리뷰 평점</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>{topResult && topResult.guideReviewRating}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" color="skyblue">총 판매 수익</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>{topResult && topResult.salesRevenue.toLocaleString()} 원</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" color="skyblue">총 판매량</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>{topResult && topResult.salesVolume}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" color="skyblue">투어 리뷰 평점</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>{topResult && topResult.tourReviewRating}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{mt:"1rem"}}>
                <Typography variant="h5" sx={{fontWeight:"700", mb:"1rem"}}>기간별 수익</Typography>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                <Grid item>
                    <TextField
                        type="date"
                        label="시작 날짜"
                        value={startDate.format('YYYY-MM-DD')}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setStartDate(dayjs(e.target.value))}
                        sx={{ width: 220 }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="date"
                        label="종료 날짜"
                        value={endDate.format('YYYY-MM-DD')}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setEndDate(dayjs(e.target.value))}
                        sx={{ width: 220 }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{backgroundColor:"skyblue"}}
                        onClick={() => getGuideStat(startDate, endDate)}
                    >
                        조회
                    </Button>
                </Grid>
            </Grid>
            {results && (
            <Grid item xs={12}>
                <div style={{height:400}}>
                    <ResponsiveBar
                        data={results}
                        keys={['salesRevenue']}
                        indexBy="title"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '투어',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '수익',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemTextColor: '#999',
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </div>
            </Grid>
            )}
        </Grid>
    );
}

export default GuideStat;