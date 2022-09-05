
import React, { useState, useEffect } from "react";
import { useGetQuery } from "../../API/GetQuery/useGetQuery.js";
import { usePostLink } from "../../API/PostQuery/usePostLink.js";
import { useFetching } from "../../customHooks/useFetching.js";
import classes from "./UserWindow.module.css";
import ModalInput from '../../components/UI/ModalInput/ModalInput';
import ListPages from '../../components/ListPages/ListPages.jsx';
import {useSortingContent} from '../../customHooks/useSortingContent.js';
import * as UserInput from '../../json/UserInput.json'
import { useParams } from "react-router-dom";
const UserWindow = () => {

  const [answer,setAnswer] = useState([]);
  const [check, setCheck] = useState(false);
  const [shortLink, setShortLink] = useState('');

  const [DataPage, setDataPage]= useState({
    Link:'',
    offset: 0,
    limit:0
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
 const params = useParams();
 const Content = useSortingContent(answer);
  const [fetching, isLoading, error] = useFetching(async () => {




    
    const     resulte = await useGetQuery(DataPage.offset,DataPage.limit, localStorage.getItem('access_token'),  localStorage.getItem('token_type'));
        setAnswer(resulte)
    


  })
 


  console.log('Фильтрация', answer.filter((elem,i)=> i>=(params.pages-1)*10&&i<=((params.pages-1)*10)+9)) 


  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }
    console.log(answer.reverse())

  useEffect(() => {
    fetching()
  }, [params.pages]);

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
              value.name==='Link'
?
  
               someFunction(DataPage[value.name])
               :
               fetching()

                 
        )}
           >
             Execute
           </button>
          </div>
      
        )
        )}
        <ListPages
answer={answer}
/>
<div className="table-responsive">
        <table  className="table table-hover table-bordered table-condensed ">
          <thead>
        <tr  >
               <th 
               onClick={()=>(setAnswer(answer.reverse()))}

                
               
               
               ></th>
            <th>Short</th>
            <th  >Target</th>
            <th >Counter</th>
                      </tr>
                      </thead>
                      <tbody>
         {answer.filter((elem,i)=> i>=(params.pages-1)*10&&i<=((params.pages-1)*10)+9).map((value,i) => (

       
          <tr key={value.id} >
<th >{(i+1 + (params.pages-1)*10)}</th>
<th >http://79.143.31.216/s/{value.short}</th>
<th >{value.target}</th>
<th >{value.counter}</th>
          </tr>


        )
        )} 
         </tbody>
</table>

</div>
      </div>


    </div> 
    // <span >Ты перешёл на страницу с таблицей</span>
    )
  
}
export default UserWindow;
