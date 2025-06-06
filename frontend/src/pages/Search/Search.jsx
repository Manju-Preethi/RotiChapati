import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import axios from "axios";
import Loader from "../../components/Loader/Loader"

const Search = () => {
  const [category, setCategory] = useState("All");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/food/search?query=${searchQuery}`
        );
        setSearchResults(res.data.data);
      } catch (err) {
        console.log("Search error", err);
      } finally {
        setLoading(false);
      }
    };
  
    if (searchQuery) {
      setLoading(true); 
      fetchSearchResults();
    }
  }, [searchQuery]);
  

  return (
    <div>
      <FoodDisplay
        category={category}
        searchQuery={searchQuery}
        searchResults={searchResults}
      />
      {loading && <Loader />}
    </div>
  );
};

export default Search;
