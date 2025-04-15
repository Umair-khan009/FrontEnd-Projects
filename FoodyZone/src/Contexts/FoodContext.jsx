import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

export const FoodContext = createContext();

const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState([]); // Ensure it's an empty array, not null

  useEffect(() => {
    const collectionRef = collection(db, "FoodItem");

    // Real-time listener
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const foodList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFoodItems(foodList); // Correctly updating state
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []); // Runs once when component mounts

  return (
    <FoodContext.Provider value={{foodItems, setFoodItems}}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;



  
    