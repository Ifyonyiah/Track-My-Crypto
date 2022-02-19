import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';


const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./pawel-czerwinski-Qiy4hr18aGs-unsplash.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
    },
}));

const Banner = () => {
    const classes = useStyles();

  return (
  <div className={classes.banner}>
      <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
              <Typography variant="h2"
              style={{
                  fontWeight: "bold",
                  marginBottom: 15,
                  fontFamily: "Baloo Bhaijaan 2",
                  color: "#3279a8"
              }}
              >Track My Crypto
              </Typography>
              <Typography variant="subtitle2"
              style={{
                  color: "#587182",
                  textTransform: "capitalize",
                  fontFamily: "Baloo Bhaijaan 2"
              }}
              >
            Stay up to date with the latest information on all your favorite cryptocurrencies!
              </Typography>
          </div>
            <Carousel />
      </Container>
  </div>
  );
};

export default Banner;
