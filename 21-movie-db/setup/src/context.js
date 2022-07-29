import React, { useState, useContext, useEffect } from "react";
import useFetch from "./useFetch";

// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState({ show: false, msg: "" });
  // const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("star wars");

  const { isLoading, error, data: movies } = useFetch(`&s=${query}`);

  // REFACTOR WITH USEFETCH CUSTOM HOOK
  // const fetchMovies = async (url) => {
  //   // when searching for new movie, display loading
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     // check the properties of data with log, to use in if/else statement
  //     console.log(data);
  //     if (data.Response === "True") {
  //       setMovies(data.Search);
  //       setError({ show: false, msg: "" });
  //     } else {
  //       setError({ show: true, msg: data.Error });
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMovies(`${API_ENDPOINT}&s=${query}`);
  // }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
