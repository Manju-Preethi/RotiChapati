import React, { useState, useContext } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
// import AppDownload from "../../components/AppDownload/AppDownload";
import Loader from "../../components/Loader/Loader";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const [category, setCategory] = useState("All");
  const { loading } = useContext(StoreContext);


  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      
      {loading ? (
        <div className="section-loader">
          <Loader />
        </div>
      ) : (
        <FoodDisplay category={category} />
      )}
      
      {/* <AppDownload /> */}
    </div>
  );
};

export default Home;
