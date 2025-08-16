import React, { useEffect, useState } from "react";
import movie_background from "../../assets/background_banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./Movies.css";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Movies = () => {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  let navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSearch(search) {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=9c546bc8&s=${search}`
      );
      if (data.Response === "True") {
        const movieShow = data.Search.slice(0, 6);
        setMovies(movieShow);
        console.log(movieShow);
      } else {
        setMovies([]);
      }
    } catch (e) {
      setMovies([]);
    }
  }

  async function fetchMovies() {
    setLoading(true);
    if (!query) {
      setMovies([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=9c546bc8&s=${query}`
      );
      if (data.Response === "True" && Array.isArray(data.Search)) {
        const results = data.Search.slice(0, 6);
        setMovies(results);
      } else {
        setMovies([]);
      }
    } catch (e) {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function filterMovies(sortOrder) {
    const sorted = [...movies].sort((a, b) =>
      sortOrder === "Oldest_To_Newest" ? a.Year - b.Year : b.Year - a.Year
    );
    setMovies(sorted);
  }

  function sortChange(event) {
    const value = event.target.value;
    setSort(value);
    filterMovies(value);
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!term.trim());
    setParams({ query: term.trim() });
  }

  useEffect(() => {
    setTerm(query);
    fetchMovies(query);
  }, [searchParams]);

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
              <h1 className="nav__bar--title" onClick={() => navigate("/")}>
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
            <form onSubmit={onSubmit}>
              <input
                id="searchInput"
                type="text"
                placeholder="Search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
              />

              <button className="input__btn" id="searchButton" type="submit">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="fa-solid fa-magnifying-glass"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="back-color">
        <div className="container">
          <img
            className="back_arrow"
            src={back_arrow_icon}
            alt=""
            onClick={() => navigate("/")}
          />
          <select id="filter" value={sort} onChange={sortChange}>
            <option value="" disabled>
              Sort
            </option>
            <option value="Oldest_To_Newest">Year , Oldest to Newest</option>
            <option value="Newest_To_Oldest">Year , Newest to Oldest</option>
          </select>
          {loading && (
            <FontAwesomeIcon
              icon={faSpinner}
              id="spinner"
              className="fas fa-spinner "
            />
          )}
          {!loading && movies.length === 0 && (
            <p className="error-message">No Results Found. Try another search.</p>
          )}
          {!loading && movies.length > 0 && (
            <div className="movieResults">
              {movies.map((movie) => (
                <div
                  className="search_result"
                  key={movie.imdbID}
                  onClick={() => navigate(`/movieinfo/${movie.imdbID}`)}
                >
                  <img src={movie.Poster} alt="" />
                  Title: {movie.Title}
                  <br></br>
                  Year: {movie.Year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
