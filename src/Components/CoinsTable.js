import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CoinList } from '../config/api';
import { CryptoState } from '../Cryptocontext';
import { numberWithCommas } from './Banner/Carousel';



const CoinsTable = () => {
const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const history = useHistory();

const {currency, symbol, coins, loading, fetchCoins} = CryptoState();



console.log(coins);

useEffect(() => {
    fetchCoins();
}, [currency]);

const theme = createTheme({
    palette: {
      primary: blueGrey,
    },
  });

  // filters search options //
  const handleSearch = () => {
      return coins.filter(
          (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search) 
      );
  };

  const useStyles = makeStyles(() => ({
      row: {
          backgroundColor: "#cf7c99",
          cursor: "pointer",
          "&:hover": {
              backgroundColor: "#de8aa7",
          },
          fontFamily: "Baloo Bhaijaan 2",
      },
      Pagination: {
          "& .MuiPaginationItem-root": {
              color: "#3279a8"
          },
      },
  }));

  const classes = useStyles();

  return (
      
      <ThemeProvider theme={theme}>
      <Container style={{textAlign: "center"}}>
          <Typography variant="h4"
          style={{margin: 18, fontFamily: "Baloo Bhaijaan 2"}}
          >Cryptocurrency Prices By Market Cap
        </Typography>
        <TextField label="Search Track My Crypto:" varient="outlined" 
        style={{marginBottom: 20, width: "100%"}}
        onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{backgroundColor: "#3279a8"}} />
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor: "#3279a8"}}>
                        <TableRow>
                           {["Coin", "Price", "24hr Change", "Market Cap"].map((head) => (
                               <TableCell style={{
                                   color: "white",
                                   fontWeight: "700",
                                   fontFamily: "Baloo Bhaijaan 2",
                               }}
                               key={head}
                               align={head === "Coin" ? "" : "right"}
                               >
                                   {head}
                                   </TableCell>
                           ))} 
                        </TableRow>
                        </TableHead>
                        <TableBody>{handleSearch()
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((row) => {
                            const profit = row.price_change_percentage_24h > 0;

                        

                            return (
                                <TableRow onClick={() => history.pushState(`/coins/${row.id}`)}
                                className={classes.row}
                                key={row.name}>


                                    <Link className={classes.row}
                                    to={`/coins/${row.id}`}>

                                    <TableCell component="th"
                                    scope= "row"
                                    style={{
                                        display: "flex",
                                        gap: 15,
                                    }}
                                    >
                                        
                                        <img 
                                        src={row?.image}
                                        alt={row.name}
                                        height="50"
                                        style={{marginBottom: 10}}
                                        />
                                        
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <span style={{ textTransform: "uppercase", fontSize: 22, color: "#3279a8"}}>
                                                {row.symbol}
                                            </span>
                                            <span style={{ color: "white"}}>{row.name}</span>
                                        </div>
                                    </TableCell>
                                    </Link>
                                
                                    <TableCell align='right'
                                    style={{color: "white"}}>
                                        {symbol}{" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>

                                    <TableCell 
                                    align="right"
                                    style={{
                                        color: profit > 0 ? "green" : "red",
                                        fontWeight: 500,
                                    }}
                                    >
                                        {profit && '+'}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                    </TableCell>

                                    <TableCell align="right" style={{color: "white"}}>
                                    {symbol}{" "}
                                    {numberWithCommas(row.market_cap.toString().slice(0, -6)
                                    )}
                                        M
                                    </TableCell>
                                    
                                </TableRow>
                                
                            );
                        
                        })}
                    
                        </TableBody>
                    </Table>
                )}
                
        </TableContainer>
        <Pagination 
        style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
        }}
        classes={{ul: classes.Pagination}}
        count={(handleSearch()?.length / 10).toFixed(0)}
        // sets page value and scrolls page to the top when you go to the next page //
        onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
        }}
        />
      </Container>
      </ThemeProvider>
  );
};

export default CoinsTable;
