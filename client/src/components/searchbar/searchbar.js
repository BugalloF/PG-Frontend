import React, { useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "../searchbar/searchbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPage,CleanPosts, CleanTransactions, CleanUsers } from "../../redux/actions";
import swal from "sweetalert";

export function SearchBar() {
  const [artWork, setArtWork] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <form
      className={s.container}
      onSubmit={(e) => {
        e.preventDefault();
        if(!artWork) return swal({
          title: "Debes inlcuir un nombre",
          icon: "warning",
        });
        dispatch(resetPage());
        // dispatch(CleanPosts()); 
        dispatch(CleanTransactions())
        dispatch(CleanUsers())
        navigate(`?name=${artWork}`);
        setArtWork('')
      }}
    >
      <div className={s.searchwrapper}>
        <input
          value={artWork}
          onChange={(e) => {
            setArtWork(e.target.value);
          }}
          className={s.search}
          placeholder="Buscar"
        />
        <button className={s.i}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </form>
  );
}
