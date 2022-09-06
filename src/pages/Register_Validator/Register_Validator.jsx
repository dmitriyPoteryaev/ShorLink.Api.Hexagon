import React, { useState } from "react";
import classes from "./Register_Validator.module.css";
import { usePostQueryRegister } from "../../API/PostQuery/usePostQueryRegister.js";
import { useFetching } from "../../customHooks/useFetching.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import Loader from "../../components/UI/Loader/Loader";
import ButtonQuery from "../../components/UI/ButtonQuery/ButtonQuery";
import * as RegisterInput from "../../json/RegisterInput.json";

const Register_Validator = () => {
  const [check, setCheck] = useState(false);
  const [RegistrationInfo, setRegistrationInfo] = useState({
    userName: "",
    Pass: "",
  });

  const [answer, setAnswer] = useState({});
  const router = useNavigate();

  const [fetching, isLoading, error] = useFetching(async () => {
    const resulte = await usePostQueryRegister(
      RegistrationInfo.userName,
      RegistrationInfo.Pass
    );
    setAnswer(resulte);
  });
  if (answer.username) {
    router("/login");
  }

  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }


  return (
    <div className={classes.Register}>
      {isLoading ? (
        <Loader />
      ) : (
        <form className={classes.form} action="#">
          <div className={classes.ready}>
            <Link className={classes.btn_reading} to={"/login"}>
              Sign In
            </Link>
            <Link className={classes.btn_reading} to={"/register"}>
              Sign Up
            </Link>
          </div>
          <span className={classes.DataEntry}>Register</span>
          {RegisterInput.default.map((value) => (
            <ModalInput
              value={value}
              check={check}
              key={value.name}
              inputValue={RegistrationInfo[value.name]}
              onchange={(event) => {
                setRegistrationInfo((prevState) => ({
                  ...prevState,
                  [value.name]: event,
                }));
              }}
            ></ModalInput>
          ))}
          <div className={error ? classes.error_active : classes.error}>
            <span>You may have already registered</span>
          </div>
        {/* <button
            className={classes.NextPage}
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              !!RegistrationInfo.userName.trim() &&
              !!RegistrationInfo.Pass.trim()
                ? fetching()
                : TimeAttention();
            }}
          >
            Execute 
          </button> */}

       <ButtonQuery
        fetching={fetching}
        value={RegistrationInfo}
        TimeAttention={TimeAttention}
        >Execute</ButtonQuery> 
        </form>
      )}
    </div>
  );
};

export default Register_Validator;
