import React, { useState } from "react";
import classes from "./Register_Validator.module.css";
import { usePostQueryRegister } from "../../customHooks/usePostQueryRegister.js";
import { useFetching } from "../../customHooks/useFetching.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalInput from '../../components/UI/ModalInput/ModalInput'
import * as RegisterInput from '../../json/RegisterInput.json'

const Register_Validator = () => {


  const [check, setCheck] = useState(false);
  const [Login, setLogin] = useState('');
  const [Pass, setPass] = useState('');

  const [answer, setAnswer] = useState({});


  const router = useNavigate();

  const [fetching, isLoading, error] = useFetching(async () => {

    const resulte = await usePostQueryRegister(Login, Pass);


    setAnswer(resulte)


  })
  if (answer.username) {

    router('/login')

  }

  RegisterInput.default[0].curentValue=Login;
  RegisterInput.default[0].functionValue=setLogin;

  RegisterInput.default[1].curentValue=Pass;
  RegisterInput.default[1].functionValue=setPass;



  // Все инпуты
  const Register = [
    {
      nameInput: 'Username',
      type: 'text',
      placeholder: 'Введите любой логин',
      name: 'login',
      curentValue: Login,
      functionValue: setLogin
    },
    {
      nameInput: 'Password',
      type: 'password',
      placeholder: 'Введите любой пароль',
      name: 'pass',
      curentValue: Pass,
      functionValue: setPass
    }

  ]

  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }

  console.log(check,Pass)

  return (


    <div className={classes.Register}>


      <form className={classes.form}

        action="#"
      >
        <div className={classes.ready}>
          <Link className={classes.btn_reading}
            to={'/login'}
          >Sign In</Link>
          <Link className={classes.btn_reading} to={'/register'} >Sign Up</Link>
        </div>
        <span className={classes.DataEntry}>Register</span>
        {Register.map((value) => (
          <ModalInput
            value={value}
            check={check}
            key={value.name}
          >
          </ModalInput>

        )
        )}
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
            Возможно,Вы уже зарегестрированы
          </span></div>
        <button
          className={classes.NextPage}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            !!Login.trim() && !!Pass.trim()
              ?
              fetching()

              : TimeAttention()
          }}
        >
          Execute
        </button>


      </form>
    </div>

  );
};

export default Register_Validator;
