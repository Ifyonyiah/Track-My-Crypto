
import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Coinpage from './Pages/Coinpage';
import Homepage from './Pages/Homepage';
import Alert from './Components/Alert';

function App() {

const useStyles = makeStyles(() => ({
  App: {
backgroundColor: "#de95af",
color: "white",
minHeight: "100vh",
  },
}));

const classes = useStyles()

  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
      <Route path="/" component={Homepage} exact />
      <Route path="/coins/:id" component={Coinpage} />
    </div>
    <Alert />
    </BrowserRouter>
  );
}

export default App;
