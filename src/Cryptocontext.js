import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CoinList } from './config/api';
import { auth, db } from './firebase';


const Crypto = createContext();

const Cryptocontext = ({children}) => {
const [currency, setCurrency] = useState("USD");
const [symbol, setSymbol] = useState("$");
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const [user, setUser] = useState(null);
const [alert, setAlert] = useState({
  open: false,
  message: "",
  type: "success"
});


const [watchlist, setWatchlist] = useState([]);

useEffect(() => {
  if (user) {
    const coinRef = doc(db, "watchlist", user.uid);

    var unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        setWatchlist(coin.data().coins);
      } else {
        console.log("No items in Watchlist");
      }
    });
    return () => {
      unsubscribe();
    };
    }
  }, [user]);


//storing user data//
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
    else setUser(null);

    console.log(user);
  });
}, []);



const fetchCoins = async () => {
  setLoading(true);
  const {data} = await axios.get(CoinList(currency));
  
  setCoins(data);
  setLoading(false);
};

useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "INR") setSymbol("₹");
    else if (currency === "JPY") setSymbol("¥");
    else if (currency === "NGN") setSymbol("₦");
    else if (currency === "UAH") setSymbol("₴");
}, [currency]);

  return (
  <Crypto.Provider value={{ 
    currency, 
    symbol, 
    setCurrency, 
    coins, 
    loading, 
    fetchCoins, 
    alert, 
    setAlert, 
    user,
    watchlist,
}}
  >
    {children}
    </Crypto.Provider>
  );
};

export default Cryptocontext;

export const CryptoState = () => {
    return useContext(Crypto);
};