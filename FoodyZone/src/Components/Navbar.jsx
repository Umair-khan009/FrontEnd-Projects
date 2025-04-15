import { addDoc, collection, doc, updateDoc, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { FormContext } from "../Contexts/FormContext";
import { EditContext } from "../Contexts/EditContext";
import { FoodContext } from "../Contexts/FoodContext";
import Loader from "./Loader";
import { useForm } from "react-hook-form";
import { FiAlignLeft } from "react-icons/fi";
import { IoClose } from "react-icons/io5";


// ============================================================
const Navbar = () => {
  const { register, handleSubmit, setValue, getValues, reset, formState: {errors, isSubmitting, isDirty}}=useForm()
  const { form, setForm } = useContext(FormContext);
  const { isEdited, setIsEdited, edit } = useContext(EditContext);
  const { setFoodItems } = useContext(FoodContext);
  const [allFoodItems, setAllFoodItems] = useState([]); // Store all items
  const [ food, setFood ] = useState({ name: '', imageUrl: '', type: '', details: '', price: '' });
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [loading, setLoading]= useState(false)

  const navigate = useNavigate();
// ============================================================
  // Fetch food items in real time
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "FoodItem"), (snapshot) => {
      const foodData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllFoodItems(foodData);
      setFoodItems(foodData);
      setLoading(false);
    }, () => setLoading(false));

    return () => unsubscribe();
  }, [setFoodItems]);
// ============================================================
  // Set form values when editing
  useEffect(() => {
    if (isEdited && edit) {
      setFood({ ...edit });
    } else {
      resetForm();
    }
  }, [isEdited, edit]);
// ============================================================
  // Handle form submission
  const sendData = async () => {
    setLoading(true);
    const formData = getValues();
  
    try {
      if (isEdited && edit?.id) {
        await updateDoc(doc(db, "FoodItem", edit.id), formData);
      } else {
        await addDoc(collection(db, "FoodItem"), formData);
      }
    } catch (error) {
      console.error("Error saving food item:", error);
    } finally {
      setLoading(false);
      resetForm(); // This will run AFTER Firebase completes
    }
  };
  
// ============================================================
  // Reset form function
  const resetForm = () => {
    reset({ name: '', imageUrl: '', type: '', details: '', price: '' }); // Clears form fields
    setForm(false);
    setIsEdited(false);
  };
  
// ============================================================
  // Filter Food items
  const filterFoodItems = (type) => {
    setFoodItems(type === "All" ? allFoodItems : allFoodItems.filter(item => item.type === type));
  };
// ============================================================
  // Handle search
  const handleSearch=(e)=>{
    const searchItem=e.target.value.toLowerCase()
    setSearchQuery(searchItem)
    if(searchItem=== ""){
      setFoodItems(allFoodItems)
    }else{
      setFoodItems(allFoodItems.filter(item => item.name.toLowerCase().includes(searchItem)))
    }
  }
  // =========================================================
  // handle edit
  useEffect(() => {
    if (isEdited && edit?.id) {
      setValue("imageUrl", edit.imageUrl || "");
      setValue("name", edit.name || "");
      setValue("type", edit.type || "");
      setValue("details", edit.details || "");
      setValue("price", edit.price || "");
    }else{
     resetForm() 
    }
    
  }, [isEdited, edit, setValue]);
  // display navbar
  const navElement=document.querySelector('.wrapper')
  const displayNav=()=>{
    navElement.style.left="0%"
  }
  // close navbar
  const closeNav=()=>{
    navElement.style.left="-50%"
  }
  return (
    <div className="nav-container">
      {loading && <Loader />}
      <FiAlignLeft onClick={displayNav} className="menu-icon" />
      <nav className={`navbar ${form ? "disabled" : ""}`}>
        <div className="container">
          <h1>F<span className="o">OO</span>D Z<span className="o">O</span>NE</h1>
          <input
            className="search"
            type="search"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="wrapper">
          <IoClose onClick={closeNav} className="close-icon" />
          <button onClick={() => {
            setForm(prev => !prev)
            closeNav()
          }} className="btn">Add</button>
          <ul className="list">
            {["All", "Breakfast", "Lunch", "Dinner"].map((type) => (
              <li key={type} onClick={() => {
                filterFoodItems(type)
                closeNav()
              }
              }>{type}</li>
            ))}
          </ul>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="btn">Logout</button>
        </div>
      </nav>
{/* =========================================================================== */}
      {form && (
        <div className="overlay" onClick={resetForm}>
          <div className="add-food-container" onClick={(e) => e.stopPropagation()}>
            <form id="form" onSubmit={handleSubmit(sendData)}>
              <div className="form-wrapper">
                <h3>{isEdited ? "Edit Food Details" : "Add Food Details"}</h3>
              </div>

              <input 
              type="text" 
              placeholder="Image URL"
              {...register("imageUrl", {
                required: 'Image Url required',
              })}
              />
              {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}

              <input 
              type="text" 
              placeholder="Food Name"
              {...register("name", {
                required: "Food name required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required"
                },
                maxLength: {
                  value: 20,
                  message: "Name length exceeded (Max 20)"
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets are allowed"
                }
              })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}

              <select className="select" 
              name="type" 
              {...register("type", {
                required: 'Please select food type',
              })}
              >
                <option value="">Select Food Type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              {errors.type && <p className="error">{errors.type.message}</p>}

              <textarea
                className="details"
                placeholder="Enter Details"
                {...register("details", {
                  required: "Please enter details about food",
                  pattern: {
                    value: /^[A-Za-z. ]+$/,
                    message: "Only alphabets, spaces, and dots are allowed"
                  },
                  minLength: {
                    value: 15,
                    message: "Minimum 15 characters required"
                  }
                })}
              />
              {errors.details && <p className="error">{errors.details.message}</p>}

              <input 
              type="text" 
              placeholder="Price"
              {...register("price", {
                required: "Price required",
                maxLength: {
                  value: 4,
                  message: "Maximum length exceeded (Max 4)"
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Symbols and decimals number are not allowed"
                }
              })} 
              />
              {errors.price && <p className="error">{errors.price.message}</p>}
              <button className="submit" disabled={!isDirty || isSubmitting} type="submit">{isDirty && isEdited ? "Update" : "Submit"}</button>

              <button onClick={resetForm} type="button">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
