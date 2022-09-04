import React from "react";
import classes from "./ModalInput.module.css";




function ModalInput({value,check,onchange,inputValue}) {


    return (

        <div className={classes.commonInp}>
        <span className={classes.nameInput}>{value.nameInput}
        </span>
        <span className={
          value.required
          ?
          classes.required
          :
          classes.NoRequired}>*required</span>
        <div className={classes.inpPlusFig}>
          <input
            className={
              check && !inputValue.trim()
                ? classes.logAttent
                : classes.log
            }
            type={value.type}
            value={inputValue}
            placeholder={value.placeholder}
            name={value.name}
            onChange={(event) =>
                onchange(event.target.value)
            }
          />
        </div>
      </div>

    );}

    export default ModalInput;