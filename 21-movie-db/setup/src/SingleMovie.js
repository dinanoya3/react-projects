import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import useFetch from "./useFetch";

// if no poster available use this
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  const { isLoading, error, data: movie } = useFetch(`&i=${id}`);

  // console.log(id);

  // REFACTOR TO USEFETCH
  // const [movie, setMovie] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState({ show: false, msg: "" });

  // const fetchMovie = async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  //   if (data.Response === "False") {
  //     setError({ show: true, msg: data.Error });
  //     setIsLoading(false);
  //   } else {
  //     setMovie(data);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMovie(`${API_ENDPOINT}&i=${id}`);
  // }, [id]);

  if (isLoading) {
    return <div className="loading">loading</div>;
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          movies
        </Link>
      </div>
    );
  }

  // destructure after loading and error because initially empty object
  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie;
  return (
    <section className="single-movie">
      <img src={poster === "N/A" ? url : poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
