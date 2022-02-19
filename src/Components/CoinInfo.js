import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { CryptoState } from '../Cryptocontext';
import SelectButton from './SelectButton';

const CoinInfo = ({coin}) => {
const [historicData, setHistoricData] = useState();
const [days, setDays] = useState(1);

const {currency} = CryptoState();

const fetchHistoricData = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
};

console.log("data", historicData);

useEffect(() => {
    fetchHistoricData()
}, [currency, days]);

const theme = createTheme({
    palette: {
      primary: blueGrey,
    },
  });

  const useStyles = makeStyles((theme) => ({
container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    pdding: 40,
    [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
    },
},
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
        <div className={classes.container}>
           {!historicData ? (
               <CircularProgress 
               style={{color: "#3279a8"}}
               size={250}
               thickness={1}
               />
           ) : (
               <>
                <Line 
                data={{
                  labels: historicData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                      date.getHours() > 12
                      ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                      : `${date.getHours() - 12}:${date.getMinutes()} AM`;
  
                      return days === 1 ? time : date.toLocaleDateString();
                     }),
                     datasets: [
                       {
                         data: historicData.map((coin) => coin[1]),
                         label: `Price (Past ${days} Days) in ${currency}`,
                         borderColor: "white",
                  },
                ],
                 }}
                 options={{
                   elements: {
                     point: {
                       radius: 1,
                     },
                   },
                 }}
                 />
                <div style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
                >
                  {chartDays.map((day) => (
                    <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                    >
                      {day.label}</SelectButton>
                  ))}
                </div>
               </>
           )}
        </div>
    </ThemeProvider>
  );
};

export default CoinInfo;