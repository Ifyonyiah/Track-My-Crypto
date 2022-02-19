import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CryptoState } from '../Cryptocontext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';



// Header styles //
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#3279a8",
    fontFamily: "Baloo Bhaijaan 2",
    fontWeight: "bold",
    cursor: "pointer",
  }
}));

export const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const {currency, setCurrency, user} = CryptoState();

console.log(currency);

const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
});

  return (
    <ThemeProvider theme={theme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography onClick={() => history.push("/")} className={classes.title}
          varient="h6">Track My Crypto</Typography>

          <Select variant="outlined"
          style={{
            width: 100,
            height: 40,
            marginRight: 15,
            color: "white",
          }}
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          >

            <MenuItem value ={"USD"}>USD</MenuItem>
            <MenuItem value ={"INR"}>INR</MenuItem>
            <MenuItem value ={"JPY"}>JPY</MenuItem>
            <MenuItem value ={"NGN"}>NGN</MenuItem>
            <MenuItem value ={"UAH"}>UAH</MenuItem>

          </Select>

          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header;
