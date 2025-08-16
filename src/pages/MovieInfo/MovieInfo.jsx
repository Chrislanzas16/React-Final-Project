import React, { useEffect, useState } from "react";
import "./MovieInfo.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true

    async function showMovie() {
        setLoading(true);
        try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=9c546bc8&i=${id}&plot=full`
      );
      if (!alive) return;
      setMovie(data);
    } catch (err){
        if (alive) setMovie(null);
    } finally {
        if (alive) setLoading(false);
    }
    };
    showMovie();
    return () => { alive = false; };
  }, [id]);
  
  

  return (
    <>
      <div className="container-background">
        <img
          className="back_arrow"
          src={back_arrow_icon}
          alt=""
          onClick={() => navigate(-1)}
        />
        {loading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            id="spinner"
            className="fas fa-spinner "
          />
        ) :  movie ? (
          <div className="movie__info">
            <div className="search_result-info" key={movie.imdbID}>
              <img src={movie.Poster} alt="" />
            </div>
            <div className="movie_info-summary">
              <h1 className="info-title"> {movie.Title}</h1>
              <br></br>
              <h3>Rated: {movie.Rated}</h3>
              <h3 className="release-date"> Release date: {movie.Year}</h3>
              <br></br>
              <p>{movie.Plot}</p>
            </div>
          </div>
        ) : ( <p>No movie found. </p>)}
      </div>
    </>
  );
};

export default MovieInfo;
