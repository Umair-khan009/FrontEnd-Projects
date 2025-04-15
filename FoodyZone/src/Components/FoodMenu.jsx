import React, { useContext } from "react";
import { FoodContext } from "../Contexts/FoodContext";
import { FormContext } from "../Contexts/FormContext";
import { EditContext } from "../Contexts/EditContext";

const FoodMenu = () => {
  const { foodItems } = useContext(FoodContext);
  const { setForm } = useContext(FormContext);
  const { setEdit } = useContext(EditContext);
  const { setIsEdited }= useContext(EditContext)

  return (
    <div className='food-grid'>
      {foodItems.map((item) => (
        <div className={`${item.type} food-card`} key={item.id}>
          <div className="card-img">
           <img src={item.imageUrl} alt='food-image' />
          </div>
          <div className='card-container'>
            <h3>{item.name}</h3>
            <p>{item.details}</p>
            <div className="buttons">
              <button onClick={() => {
                setForm(true);
                setEdit(item); // ✅ Store correct format
                setIsEdited(true)
              }} className='btn' type='button'>Edit</button>
              <button className='btn' type='button'>Rs-{item.price}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodMenu;
