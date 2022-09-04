import React, { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Login_Validator.module.css";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import { usePostQueryLogin } from "../../API/PostQuery/usePostQueryLogin.js";
import { useFetching } from "../../customHooks/useFetching.js";
import * as LoginInput from "../../json/LoginInput.json";
import { useNavigate } from "react-router-dom";
import ButtonQuery from "../../components/UI/ButtonQuery/ButtonQuery";

const Login_Validator = () => {
  const [userDate, setUserDate] = useState({
    userName: "",
    Grant_Type: "",
    client_id: "",
    Pass: "",
    Scope: "",
    client_secret: "",
  });
  const [answer, setAnswer] = useState({});

  const [check, setCheck] = useState(false);

  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }

  const [fetching, isLoading, error] = useFetching(async () => {
    const resulte = await usePostQueryLogin(
      userDate.Grant_Type,
      userDate.userName,
      userDate.Pass,
      userDate.client_secret,
      userDate.client_id
    );

    console.log(resulte);
    setAnswer(resulte);
  });

  const router = useNavigate();
  if (answer.access_token && answer.token_type) {
    console.log("Всё прошло");

    localStorage.setItem("access_token", answer.access_token);
    localStorage.setItem("token_type", answer.token_type);
    router("/UserWindow");
  }

  return (
    <div className={classes.Login}>
      <form className={classes.form} action="#">
        <span className={classes.DataEntry}>Login</span>
        {LoginInput.default.map((value) => (
          <ModalInput
            value={value}
            key={value.name}
            userDate={userDate}
            inputValue={userDate[value.name]}
            onchange={(event) => {
              setUserDate((prevState) => ({
                ...prevState,
                [value.name]: event,
              }));
            }}
            check={check}
          ></ModalInput>
        ))}
        <div
          className={
            error
              ?
              classes.error_active
              :
              classes.error
          }
        >
          <span
          >
          Something went wrong
          </span></div>
               <button
          className={classes.NextPage}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            !!userDate.userName.trim() && !!userDate.Pass.trim()
              ?
              fetching()

              : TimeAttention()
          }}
        >
          Execute
        </button>

        {/* <ButtonQuery
          value={userDate}
          fetching={fetching}
          TimeAttention={TimeAttention}
        >
          Execute
        </ButtonQuery> */}
      </form>
    </div>
  );
};

export default Login_Validator;
