import { makeStyles } from '@material-ui/core';
import React from 'react';

const SelectButton = ({children, selected, onClick}) => {
    const useStyles = makeStyles({
        selectbutton: {
            border: "1px solid white",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Baloo Bhaijaan 2",
            cursor: "pointer",
            backgroundColor: selected ? "white" : "#3279a8",
            color: selected ? "#de8aa7" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "#cf7c99",
                color: "#3279a8",
            },
            width: "22%",
        },
    });

    const classes = useStyles();

  return <span
  onClick={onClick}
  className={classes.selectbutton}>{children}</span>;
};

export default SelectButton;
