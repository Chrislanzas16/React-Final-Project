import React from "react";
import movie_background from "../../assets/background_banner.jpg";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <figure>
        <img className="movie__img" src={movie_background} alt="" />
      </figure>
      <div className="background">
        <nav className="nav__bar">
          <div className="nav__content--wrapper">
            <div className="movie__title--img">
              <img
                className="small__img"
                src="https://cdn.pixabay.com/photo/2015/12/05/21/45/filmklappe-1078813_1280.png"
                alt=""
              />
              <h1 className="nav__bar--title">
                <span className="white">Movie Hub</span>
              </h1>
            </div>
            <div className="nav__header--links">
              <Link to="/"
               className="nav__link" href="">
                Home
              </Link>
              <a className="nav__link">Find your movie</a>
              <a className="nav__link nav__link--btn">Contact</a>
            </div>
          </div>
        </nav>
        <div className="home-container">
          <h1 className="home-title">
            Your number one place to search for Movies
          </h1>
        </div>
      </div>
      <div className="home--search">
        <div className="browse__btn--wrapper">
          <form>
            <input id="searchInput" placeholder=" Search Movies" />

            <button className="input__btn" id="searchButton" type="button">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="fa-solid fa-magnifying-glass"
              />
            </button>
          </form>
        </div>
      </div>
      <i id="spinner" className="fas fa-spinner hidden"></i>
    </>
  );
};

export default Home;
