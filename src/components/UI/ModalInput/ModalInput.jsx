import React from "react";
import classes from "./ModalInput.module.css";




function ModalInput({value,check}) {


    return (

        <div className={classes.commonInp}>
        <span className={classes.nameInput}>{value.nameInput}</span>
        <div className={classes.inpPlusFig}>
          <input
            className={
              check && !value.curentValue.trim()
                ? classes.logAttent
                : classes.log
            }
            type={value.type}
            placeholder={value.placeholder}
            name={value.name}
            onChange={(event) =>
                value.functionValue(event.target.value)
            }
          />
        </div>
      </div>

    );}

    export default ModalInput;