import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

// environment variable
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [newImages, setNewImages] = useState(false);
  // useRef doesnot trigger re-render
  const mounted = useRef(false);

  const fetchImages = async () => {
    setLoading(true);
    // url will change with search or display options
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);

      // add next 10 images to load on top of INITIAL 10
      setPhotos((prevPhotos) => {
        // return [...prevPhotos, ...data];
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...prevPhotos, ...data.results];
        } else {
          return [...prevPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
      console.log(error);
    }
  };

  // run when app loads
  // re-fetch data (images) when page changes
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  // don't run on initial render
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((prevPage) => {
      return prevPage + 1;
    });
  }, [newImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      // create a new state value
      setNewImages(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  // set up event listener when app loads
  // event listener for scroll events
  // useEffect(() => {
  //   const event = window.addEventListener("scroll", () => {
  //     // check innerHeight, scroll position, height of document
  //     // console.log(`inner height ${window.innerHeight}`);
  //     // console.log(`scrollY ${window.scrollY}`);
  //     // console.log(`document height ${document.body.scrollHeight}`);

  //     // if not loading AND innerHeight + scrollY >= body.scrollHeight, fetch more data
  //     // only fetch new images if not loading
  //     if (
  //       !loading &&
  //       window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
  //     ) {
  //       setPage((prevPage) => {
  //         return prevPage + 1;
  //       });
  //     }
  //   });
  //   // eslint-disable-next-line
  //   // remove event listener
  //   return () => {
  //     window.removeEventListener("scroll", event);
  //   };
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    if (page === 1) {
      fetchImages();
      // use return to not invoke setPage if the page is 1
      return;
    }
    setPage(1);
    // fetchImages();  //already have a useEffect listening for the page
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="Search"
            className="form-input"
            value={query}
            // change state value when input changes
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>

      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={image.id} {...image} />;
          })}
        </div>

        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
