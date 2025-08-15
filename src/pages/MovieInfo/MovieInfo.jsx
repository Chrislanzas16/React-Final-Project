import React, { useEffect, useState } from "react";
import "./MovieInfo.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function showMovie() {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=9c546bc8&i=${id}&plot=full`
      );
      setMovie(data);
    }

    showMovie();
  }, [id]);
  if (!movie) return null;

  return (
    <>
      <div className="container-background">
        <img
          className="back_arrow"
          src={back_arrow_icon}
          alt=""
          onClick={() => navigate(-1)}
        />
        <div className="movie__info">
          <div className="search_result-info" key={movie.imdbID}>
            <img src={movie.Poster} alt="" />
          </div>
          <div className="movie_info-summary">
            <h1 className="info-title"> {movie.Title}</h1>
            <br></br>
            <h3 className="release-date"> Release date: {movie.Year}</h3>
            <br></br>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
