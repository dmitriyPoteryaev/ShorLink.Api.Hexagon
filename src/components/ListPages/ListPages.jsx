import React, { useState, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./ListPages.module.css";

const ListPages = ({ answer, DataPage }) => {
  const params = useParams();

  let TotalPages = [];

  for (let i = 0; i < Math.ceil(answer.length / 10); i++) {
    TotalPages.push(i + 1);
  }

  const [bordTotalPages, setbordTotalPages] = useState([]);

  useEffect(() => {
    TotalPages.length <= 5
      ? setbordTotalPages(TotalPages)
      : params.pages == 1
      ? setbordTotalPages(
          TotalPages.filter((elem) => elem <= +params.pages + 5)
        )
      : params.pages >= TotalPages.length - 5
      ? setbordTotalPages(
          TotalPages.filter(
            (elem) => elem >= TotalPages.length - 5 && elem <= TotalPages.length
          )
        )
      : setbordTotalPages(
          TotalPages.filter(
            (elem) => elem >= +params.pages && elem <= +params.pages + 5
          )
        );
  }, [answer]);

  return (
    <div className={classes.BlockPages}>
      <Link
        className={classes.Prev}
        to={`/UserWindow/${
          +params.pages == 1 ? (params.pages = 1) : +params.pages - 1
        }`}
      >
        Previous
      </Link>
      {bordTotalPages.map((pages) =>
        params.pages == pages ? (
          <Link
            className={classes.PageActive}
            key={pages}
            to={`/UserWindow/${pages}`}
          >
            {pages}
          </Link>
        ) : (
          <Link
            className={classes.Page}
            key={pages}
            to={`/UserWindow/${pages}`}
          >
            {pages}
          </Link>
        )
      )}

      <Link
        className={classes.Next}
        to={`/UserWindow/${
          +params.pages == TotalPages.length
            ? (params.pages = TotalPages.length)
            : +params.pages + 1
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default ListPages;
