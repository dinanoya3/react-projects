import React, { useState, useEffect } from "react";

// make sure to use https
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState(null);

  const fetchMovies = async (url) => {
    // when searching for new movie, display loading
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      // check the properties of data with log, to use in if/else statement
      console.log(data);
      if (data.Response === "True") {
        // console.log(data);
        setData(data.Search || data);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: data.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return { isLoading: isLoading, error: error, data: data };
};

export default useFetch;
