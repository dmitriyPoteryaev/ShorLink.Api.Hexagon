import React, { useState, useEffect } from "react";
import { useGetQuery } from "../../API/GetQuery/useGetQuery.js";
import { usePostLink } from "../../API/PostQuery/usePostLink.js";
import { useFetching } from "../../customHooks/useFetching.js";
import classes from "./UserWindow.module.css";
import ModalInput from "../../components/UI/ModalInput/ModalInput";
import ListPages from "../../components/ListPages/ListPages.jsx";
import { useSortingContent } from "../../customHooks/useSortingContent.js";
import * as UserInput from "../../json/UserInput.json";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import ButtonQuery from "../../components/UI/ButtonQuery/ButtonQuery";

const UserWindow = () => {
  const [answer, setAnswer] = useState([]);
  const [check, setCheck] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const [filter, setFilter] = useState("");

  const [DataPage, setDataPage] = useState({
    Link: "",
    offset: "0",
    limit: "0",
  });

  const router = useNavigate();

  const params = useParams();
  const Content = useSortingContent(answer, filter);
  const [fetching, isLoading, error] = useFetching(async () => {
    const resulte = await useGetQuery(
      DataPage.offset,
      DataPage.limit,
      localStorage.getItem("access_token"),
      localStorage.getItem("token_type")
    );
    setAnswer(resulte.map((elem, i) => ({ ...elem, number: i + 1 })));
  });

  function TimeAttention() {
    setCheck(true);

    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }

  useEffect(() => {
    fetching();
  }, [params.pages]);

  async function GetShortUrl() {
    const res = await usePostLink(
      DataPage.Link,
      localStorage.getItem("token_type"),
      localStorage.getItem("access_token")
    );

    res.short ? setShortLink(res.short) : setShortLink(`${res}`);

    setDataPage({ ...DataPage, Link: "" });
  }

  return (
    <div className={classes.UserWindow}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.form}>
          <div>
            <span className={classes.DataEntry}>Your Account</span>
            <div className={shortLink ? classes.Link : classes.NoLink}>
              {shortLink.split("").length >= 15 ? (
                shortLink
              ) : (
                <div className={classes.Linking}>
                  http://79.143.31.216/s/{shortLink}
                </div>
              )}
            </div>

            <div className={error && check ? classes.Link : classes.NoLink}>
              {error}
            </div>

            {UserInput.default.map((value, i) => (
              <div key={value.name} className={classes.BtnPlusInp}>
                <ModalInput
                  value={value}
                  check={check}
                  key={value.name}
                  inputValue={DataPage[value.name]}
                  onchange={(event) => {
                    setDataPage((prevState) => ({
                      ...prevState,
                      [value.name]: event,
                    }));
                  }}
                ></ModalInput>
                {value.name === "Link" ? (
                  <ButtonQuery
                    fetching={GetShortUrl}
                    value={{ Link: DataPage.Link }}
                    TimeAttention={TimeAttention}
                  >
                    Execute
                  </ButtonQuery>
                ) : (
                  <ButtonQuery
                    fetching={fetching}
                    value={{
                      offset: DataPage.offset,
                      limit: DataPage.limit,
                    }}
                    TimeAttention={TimeAttention}
                  >
                    Execute
                  </ButtonQuery>
                )}
              </div>
            ))}
            <ListPages answer={answer} DataPage={DataPage} />
            <div className="table-responsive">
              <table className="table table-hover table-bordered table-condensed ">
                <thead>
                  <tr className={classes.active} >
                    <th 

                     onClick={
                      
                      () => setAnswer([...answer].reverse())}></th>
                    <th >Short</th>
                    <th >Target</th>
                    <th
                   
                      onClick={() =>
                        setFilter(filter === "counter" ? "" : "counter")
                      }
                    >
                      Counter
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Content.filter(
                    (value) =>
                      value.number - 1 >= (params.pages - 1) * 10 &&
                      value.number - 1 <= (params.pages - 1) * 10 + 9
                  ).map((value) => (
                    <tr key={value.id}>
                      <th key={value.id}>{value.number}</th>
                      <th
                        key={value.short}
                        className={classes.table_responsive}
                      >
                        http://79.143.31.216/s/{value.short}
                      </th>
                      <th
                        key={value.target}
                        className={classes.table_responsive}
                      >
                        {value.target}
                      </th>
                      <th key={value.counter}>{value.counter}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserWindow;
