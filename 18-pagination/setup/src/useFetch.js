import { useState, useEffect } from "react";
import paginate from "./utils";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    // paginate(data);
    // we paginate data first
    setData(paginate(data));
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  // data to be returned from useFetch CUSTOM HOOK
  return { loading, data };
};
