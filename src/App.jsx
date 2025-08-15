import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import MovieInfo from "./pages/MovieInfo/MovieInfo"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movieinfo/:id" element={<MovieInfo />} />
      </Routes>
    </div>
  );
};

export default App;
