import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import {Button, Card, CardContent, Grid, TextField} from "@mui/material";
import {ResponsiveBar} from "@nivo/bar";

function Report(props) {

    const accessToken = useSelector((state) => state.accessToken); // 엑세스 토큰

    // 월별가입수 담을 state
    const [memberPerMonth, setMemberPerMonth] = useState(0);
    // 월별 예약 수 담을 state
    const [paymentPerMonth, setPaymentPerMonth] = useState(0);
    // 총 회원 수 담을 state
    const [totalMembers, setTotalMembers] = useState(0);

    const [result1, setResult1] = useState(null); // 결과담을 state

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result2, setResult2] = useState([]);

    // /stats/member-per-month
    // 월별 가입 수
    const getMemberPerMonth = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/stats/member-per-month`,
            null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            },
        ).then((res) => {
            console.log(res)
            if(res && res.data){
                setMemberPerMonth(res.data[0].totalCnt)
                const chartData = res.data.map(item => ({
                    month: item.month,
                    totalCnt: item.totalCnt
                }));
                setResult1(chartData)
            }
        }).catch((err) => console.log(err))
    }

    ///stats/payment-per-month
    // 월별 예약 수
    const getPaymentPerMonth = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/stats/payment-per-month`,
            null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            },
        ).then((res) => {
            if(res && res.data){
                console.log(res.data)
                setPaymentPerMonth(res.data[0].totalCnt)
            }
        }).catch((err) => console.log(err))
    }

    // /stats/total-members
    // 현재 총 회원 수
    const getTotalMembers = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/stats/total-members`,
            null,
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            },
        ).then((res) => {
            if(res && res.data){
                console.log(res.data)
                setTotalMembers(res.data.total)
            }
        }).catch((err) => console.log(err))
    }

    const fetchData = async () => {
        try {
            console.log("fetching data...")
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/stats/total-volume-percentage`, {
                startDate,
                endDate
            },
                {
                headers: {
                    Authorization: `${accessToken}`,
                },
            });
            console.log(response)
            const formattedData = response.data.totalVolumePercentageDTOList.map(item => ({
                ...item,
                "percentage": item.percentage
            }));
            setResult2(formattedData);
            console.log(formattedData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [siteProfit, setSiteProfit] = useState(null); // 결과담을 state

    /**
     * /stats/site-profit
     * */
    const getSiteProfit = async () => {
        // startDate는 1년전
        const startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD');
        // endDate는 오늘
        const endDate = dayjs().format('YYYY-MM-DD');
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/stats/site-profit`,
            {
                startDate: startDate,
                endDate: endDate,
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            },
        ).then((res) => {
            console.log("site profit")
            console.log(res)
            if(res && res.data){
                console.log(res.data)
                setSiteProfit(res.data)
            }
        }).catch((err) => console.log(err))
    }

    function StatsCard({ title, data }) {
        return (
            <Grid item xs={12} sm={6} md={4} >
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {data}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    useEffect(() => {
        if(accessToken){
            getMemberPerMonth();
            getPaymentPerMonth();
            getTotalMembers();
            getSiteProfit();
        }
    }, [accessToken]);

    return (
        <Grid container sx={{width:"100%", p:"5rem"}}>
            <Grid container spacing={3}>
                <StatsCard title="이번 달 가입 수" data={memberPerMonth} />
                <StatsCard title="이번 달 예약 수" data={paymentPerMonth} />
                <StatsCard title="총 회원 수" data={totalMembers} />
                <StatsCard title="연간 총 수익" data={siteProfit && siteProfit.totalProfit} />
                <StatsCard title="연간 총 수익" data={siteProfit && siteProfit.toursProfit} />
                <StatsCard title="연간 배너 수익" data={siteProfit && siteProfit.bannerProfit} />
                <Grid xs={12} item sx={{mt:"1rem"}}>
                    <Typography variant="h6" color="text.secondary">
                        월별 가입 수
                    </Typography>
                </Grid>
            </Grid>
            {result1 && (
                <Grid xs={12} item sx={{mt:"0.5rem"}}>
                    <div style={{ height: 500 }}>
                        <ResponsiveBar
                            data={result1}
                            keys={['totalCnt']}
                            indexBy="month"
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
                                legend: '월',
                                legendPosition: 'middle',
                                legendOffset: 32
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: '수',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                    </div>
                </Grid>
            )}
            <Grid container item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid xs={12} item>
                        <Typography variant="h6" color="text.secondary">
                            판매 비율
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            type="date"
                            label=""
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="date"
                            label=""
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={fetchData}>Load Data</Button>
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    {
                        result2 && (
                            <div style={{ height: 400 }}>
                                <ResponsiveBar
                                    data={result2}
                                    keys={['percentage']}
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
                                        legend: '투어명',
                                        legendPosition: 'middle',
                                        legendOffset: 32
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: '판매 비율 (%)',
                                        legendPosition: 'middle',
                                        legendOffset: -40
                                    }}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                />
                            </div>
                        )
                    }
                </Grid>


            </Grid>

        </Grid>
    );
}

export default Report;