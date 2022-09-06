import React, { useState } from "react";
import classes from "./ButtonQuery.module.css";

const ButtonQuery = ({value,children,fetching,TimeAttention}) => {


    return (
        <button
        className={classes.NextPage}
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          Object.values(value).every((elem)=>!!elem.trim())
            ?
            fetching()
            :TimeAttention()
        }}
      >
        {children}
      </button>


        );
    };

export default ButtonQuery;
