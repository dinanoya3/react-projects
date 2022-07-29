import React, { useState, useEffect } from "react";
import data from "./data";
import Article from "./Article";

// local storage
const getStorageTheme = () => {
  let theme = "light-theme";
  // if key exists, set variable to value returned
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function App() {
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  // change every time theme changes, and by default (when app loads)
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <main>
      <nav>
        <div className="nav-center">
          <h1>overreacted</h1>
          <button className="btn" onClick={toggleTheme}>
            toggle
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map((item) => {
          {
            /* use spread attribute to pass whole props object*/
          }
          return <Article key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
