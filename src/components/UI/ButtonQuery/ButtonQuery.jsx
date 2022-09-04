import React, { useState } from "react";
import classes from "./ButtonQuery.module.css";

const ButtonQuery = ({value,children,fetching,TimeAttention}) => {



    var result;

    if(typeof(value)==='object'){

        result = Object.values(value).every((elem)=>!!elem.trim())
    }
    else{
        result = !!value.trim()
    }

    return (
        <button
        className={classes.NextPage}
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          result
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
