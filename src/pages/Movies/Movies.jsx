import React from "react";
import movie_background from "../../assets/background_banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Movies.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="background">
        <figure>
          <img className="movie__img--movies" src={movie_background} alt="" />
        </figure>
        <nav className="nav__bar">
          <div className="nav__content--wrapper">
            <div className="movie__title--img">
              <img
                className="small__img"
                src="https://cdn.pixabay.com/photo/2015/12/05/21/45/filmklappe-1078813_1280.png"
                alt=""
              />
              <h1 className="nav__bar--title" onClick={()=>navigate("/")}>
                <span className="white">Movie Hub</span>
              </h1>
            </div>

            <div className="nav__header--links">
              <Link to="/" className="nav__link" href="">
                Home
              </Link>
              <a className="nav__link">Find your movie</a>
              <a className="nav__link nav__link--btn">Contact</a>
            </div>
          </div>
        </nav>
        <div className="browse__movie--wrapper">
          <h2 className="browse__title">Browse our Movies</h2>
          <div className="browse__btn--wrapper">
            <form>
              <input id="searchInput" placeholder="Search" />

              <button className="input__btn" id="searchButton" type="button">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="fa-solid fa-magnifying-glass"
                />
              </button>
            </form>
          </div>
          <i id="spinner" className="fas fa-spinner hidden"></i>
        </div>
      </div>
      <div className="back-color">
        <div className="container">
          <select id="filter" onChange="filterMovies(event)" defaultValue="">
            <option value="" disabled>
              Sort
            </option>
            <option value="Oldest_To_Newest">Year , Oldest to Newest</option>
            <option value="Newest_To_Oldest">Year , Newest to Oldest</option>
          </select>
          <div className="movieResults"></div>
        </div>
      </div>
    </>
  );
};

export default Movies;
