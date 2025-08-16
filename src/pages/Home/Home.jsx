import React, { useEffect, useState } from "react";
import movie_background from "../../assets/background_banner.jpg";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=9c546bc8&s=fast`
    );
    setMovies(data.Search);
  }

  async function onSearch(search) {
    setLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=9c546bc8&s=${search}`
    );
    if (data.Response === "True") {
      const movieShow = data.Search.slice(0, 6);
      setMovies(movieShow);
    } else {
      setMovies([]);
    }
    setLoading(false);
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(term);
      navigate(`/movies?query=${term}`);
    }
  }

  function onClick() {
    onSearch(term);
    navigate(`/movies?query=${term}`);
  }

  function onSubmit(event) {
    event.preventDefault();
    onSearch(term);
  }

  useEffect(() => {
    getMovies();
  }, []);

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
              <Link to="/" className="nav__link" href="">
                Home
              </Link>
              <a className="nav__link">Find your movie</a>
              <a className="nav__link nav__link--btn">Contact</a>
            </div>
          </div>
        </nav>
        <div className="home-container">
          <h1 className="home-title">Your number one place for Movies</h1>
        </div>
      </div>
      <div className="home--search">
        <div className="browse__btn--wrapper">
          <form onSubmit={onSubmit}>
            <input
              id="searchInput"
              type="text"
              placeholder=" Search Movies"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              onKeyDown={onKeyDown}
            />

            <button
              className="input__btn"
              id="searchButton"
              type="button"
              onClick={onClick}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="fa-solid fa-magnifying-glass"
              />
            </button>
          </form>
          <FontAwesomeIcon icon={faSpinner} id="spinner" className="fas fa-spinner hidden"/>
        </div>
      </div>
    </>
  );
};

export default Home;
