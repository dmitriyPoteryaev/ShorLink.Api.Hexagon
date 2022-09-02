import React, { useState } from "react";
import classes from "./Register_Validator.module.css";
import { usePostQuery } from "../../customHooks/usePostQuery.js";
import { useFetching } from "../../customHooks/useFetching.js";
import { useNavigate } from "react-router-dom";

const Register_Validator = () => {
  const [check, setCheck] = useState(false);
  const [Logo_Pass, setLogo_Pass] = useState({
    Logo: "",
    Pass: "",
  });

  const router = useNavigate();

  const [fetching,isLoading,error] =  useFetching ( async() => {


    const result = await usePostQuery(Logo_Pass.Logo,Logo_Pass.Pass);
   
   

    console.log('Твой результат в валидаторе',result)

    result.status==200
    ?
    router('/login')
    :
    console.log('Твой плохой результат',result)
  })


  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }

  console.log('Твоя ошибка',error)

  return (
    
    
    <div className={classes.Register}>
      <div className={classes.form}>
        <span className={classes.DataEntry}>Введите данные для входа</span>
        <div className={classes.commonInp}>
          <span className={classes.nameInput}>Логин</span>
          <div className={classes.inpPlusFig}>
            <input
              className={
                check && !Logo_Pass.Logo.trim()
                  ? classes.logAttent
                  : classes.log
              }
              type="text"
              placeholder="Введите любой логин"
              name="event"
              onChange={(event) =>
                setLogo_Pass({ ...Logo_Pass, Logo: event.target.value })
              }
            />
          </div>
        </div>
        <div className={classes.commonInp}>
          <span className={classes.nameInput}>Пароль</span>
          <div className={classes.inpPlusFig}>
            <input
              className={
                check && !Logo_Pass.Pass.trim()
                  ? classes.passAttent
                  : classes.pass
              }
              type="password"
              placeholder="Введите любой пароль"
              name="event"
              onChange={(event) =>
                setLogo_Pass({ ...Logo_Pass, Pass: event.target.value })
              }
            />
          </div>
        </div>

        <button
          className={classes.NextPage}
          type="submit"
          onClick={() =>
            !!Logo_Pass.Logo.trim() && !!Logo_Pass.Pass.trim()
              ? 
              fetching()

              : TimeAttention()
          }
        >
          Войти
        </button>
      </div>
    </div>
  
  );
};

export default Register_Validator;
