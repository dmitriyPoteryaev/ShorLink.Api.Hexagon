import React, { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Login_Validator.module.css";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import { usePostQueryLogin } from "../../API/PostQuery/usePostQueryLogin.js";
import { useFetching } from "../../customHooks/useFetching.js";
import * as LoginInput from "../../json/LoginInput.json";
import { useNavigate } from "react-router-dom";
import ButtonQuery from "../../components/UI/ButtonQuery/ButtonQuery";
import Loader from "../../components/UI/Loader/Loader";

const Login_Validator = () => {
  const [userDate, setUserDate] = useState({
    Grant_Type: "",
    userName: "",
    Pass: "",
    Scope: "",
    client_id: "",
    client_secret: "",
  });
  const [answer, setAnswer] = useState({});

  const [content, setContent] = useState(LoginInput.default);

  const [check, setCheck] = useState(false);

  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }

  const [fetching, isLoading, error] = useFetching(async () => {
    let link = "";
    content.forEach((el, i) => {
      Object.values(userDate)[i] || content[i].StatusCheckbox
        ? (link = link + content[i].nameInput + "=" + userDate[el.name] + "&")
        : "";
    });

    if (link[link.length - 1] == "&") {
      link = link.slice(0, link.length - 1);
    }

    console.log(link)
    const resulte = await usePostQueryLogin(link);

    setAnswer(resulte);
  });

  const router = useNavigate();
  if (answer.access_token && answer.token_type) {
    localStorage.setItem("access_token", answer.access_token);
    localStorage.setItem("token_type", answer.token_type);
    router("/UserWindow/1");
  }

  return (
    <div className={classes.Login}>
      {isLoading ? (
        <Loader />
      ) : (
        <form className={classes.form} action="#">
          <span className={classes.DataEntry}>Login</span>
          {content.map((value) => (
            <ModalInput
              value={value}
              key={value.name}
              userDate={userDate}
              changeStatus={(name, status) => {
                setContent(
                  content.map((el) => {
                    if (el.name === name) {
                      el.StatusCheckbox = !el.StatusCheckbox;
                      if (!status) {
                        setUserDate({ ...userDate, [name]: "" });
                      }
                      return el;
                    } else return el;
                  })
                );
              }}
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
          <div className={error ? classes.error_active : classes.error}>
            <span>Something went wrong</span>
          </div>

          <ButtonQuery
            fetching={fetching}
            value={{
              userName: userDate.userName,
              Pass: userDate.Pass,
            }}
            TimeAttention={TimeAttention}
          >
            Execute
          </ButtonQuery>
        </form>
      )}
    </div>
  );
};

export default Login_Validator;
