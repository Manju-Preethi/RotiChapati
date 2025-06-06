import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchQuery, searchResults }) => {
  const { food_list } = useContext(StoreContext);

  // Use search results if query exists, otherwise full list
  const itemsToDisplay = searchQuery ? searchResults : food_list;

  return (
    <div className="food-display" id="food-display">
      <h2 className="h2we">
        {searchQuery ? `Search results for "${searchQuery}"` : "Top dishes near you"}
      </h2>
      <div className="food-display-list">
        {itemsToDisplay.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
