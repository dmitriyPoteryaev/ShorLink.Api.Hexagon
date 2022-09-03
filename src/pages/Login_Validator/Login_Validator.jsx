import React, { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Login_Validator.module.css";
import ModalInput from '../../components/UI/ModalInput/ModalInput'
import { usePostQueryLogin } from "../../customHooks/usePostQueryLogin.js";
import { useFetching } from "../../customHooks/useFetching.js";
import * as LoginInput from '../../json/LoginInput.json'

const Login_Validator = () => {
  const [answer, setAnswer] = useState({});


 
  const [userName,setUsername] = useState('');
  const [Grant_Type,setGrant_Type] = useState('');
  const [client_id,setClient_id] = useState('');
  const [Pass,setPass] = useState('');
  const [Scope,setScope] = useState('');
  const [client_secret,setClient_secret] = useState('');

  

  const [fetching, isLoading, error] = useFetching(async () => {

    const resulte = await usePostQueryLogin(Grant_Type, userName, Pass, client_secret, client_id);

    console.log(resulte)
    setAnswer(resulte)

  })
  if (answer.access_token && answer.token_type) {
    console.log('Всё прошло')
    router('/login')

  }

 
    LoginInput.default[0].curentValue = Grant_Type;
    LoginInput.default[0].functionValue = setGrant_Type;

    
    LoginInput.default[1].curentValue = userName;
    LoginInput.default[1].functionValue = setUsername;

    
    LoginInput.default[2].curentValue = Pass;
    LoginInput.default[2].functionValue = setPass;

    
    LoginInput.default[3].curentValue = Scope;
    LoginInput.default[3].functionValue = setScope;

    
    LoginInput.default[4].curentValue = client_id;
    LoginInput.default[4].functionValue = setClient_id;

    LoginInput.default[5].curentValue = client_secret;
    LoginInput.default[5].functionValue = setClient_secret;
  


  return (
    <div className={classes.Login}>
      <div className={classes.form}>
        <span className={classes.DataEntry}>Login</span>
        {LoginInput.default.map((value) => (
          <ModalInput
            value={value}
            key={value.name}
          // check={check}
          >
          </ModalInput>

        )
        )}


        <button
          className={classes.NextPage}
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            !!userName.trim() && !!Pass.trim()
              ?
              fetching()

              : TimeAttention()
          }}
        >
          Execute
        </button>
      </div>


    </div>
  );
};

export default Login_Validator;