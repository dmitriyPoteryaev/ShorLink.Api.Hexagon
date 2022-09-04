
import React, { useState, useEffect } from "react";
import { useGetQuery } from "../../API/GetQuery/useGetQuery.js";
import { usePostLink } from "../../API/PostQuery/usePostLink.js";
import { useFetching } from "../../customHooks/useFetching.js";
import classes from "./UserWindow.module.css";
import ModalInput from '../../components/UI/ModalInput/ModalInput';
import * as UserInput from '../../json/UserInput.json'

const UserWindow = () => {

  const [answer,setAnswer] = useState([]);
  const [check, setCheck] = useState(false);
  const [shortLink, setShortLink] = useState('');

  const [DataPage, setDataPage]= useState({
    Link:'',
    offset: 0,
    limit:10
  })

  console.log(DataPage.Link)
  console.log('Твой результат',shortLink)

  async function someFunction(name){
    console.log(name)
  const resulte    = await usePostLink(name,localStorage.getItem('token_type'),localStorage.getItem('access_token'))
  setShortLink(resulte.short)
  setDataPage({...DataPage,
    Link:''})

 }

  const [fetching, isLoading, error] = useFetching(async () => {




    
    const     resulte = await useGetQuery(DataPage.offset,DataPage.limit, localStorage.getItem('access_token'),  localStorage.getItem('token_type'));
        setAnswer(resulte)
    


  })

  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }
    

  useEffect(() => {
    fetching();
  }, []);

    return (
      <div className={classes.UserWindow}>
      <div className={classes.form}>
        <span className={classes.DataEntry}>Your Account</span>
        <div className={
           shortLink
           ?
           classes.Link
           :
          classes.NoLink
          }>
          http://79.143.31.216/s/{shortLink}</div>
        {UserInput.default.map((value,i) => (
           <div  className={classes.BtnPlusInp}>
          <ModalInput
            value={value}
            check={check}
            key={value.name}
            inputValue={DataPage[value.name]}
            onchange={(event) => {
          
              setDataPage(prevState => ({

              ...prevState
              ,
              
               [value.name]: event
            }))}}
          >
                

          </ModalInput>
          <button
             className={classes.NextPage}
             type="submit"
             onClick={(event) => (
               event.preventDefault(),
            
               someFunction(DataPage[value.name])

                 
        )}
           >
             Execute
           </button>
          </div>
      
        )
        )}

        <table className={classes.table}>
         {answer.map((value,i) => (

         i==0
         ?
            <tr className={classes.tr}>
               <th className={classes.th}></th>
            <th className={classes.th}>Counter</th>
            <th className={classes.th} >Short</th>
            <th className={classes.th}>Target</th>
                      </tr>

        :
       
          <tr className={classes.tr}>
<th className={classes.th}>{i}</th>
<th className={classes.th}>{value.counter}</th>
<th className={classes.th} >http://79.143.31.216/s/{value.short}</th>
<th className={classes.th}>{value.target}</th>
          </tr>


        )
        )} 
</table>

        
      </div>


    </div> 
    // <span >Ты перешёл на страницу с таблицей</span>
    )
  
}
export default UserWindow;
