import React, { createContext, useState } from "react";

export const EditContext=createContext()

const EditContextProvider=({children})=>{
  const [edit, setEdit]= useState(null);
  const [isEdited, setIsEdited]=useState(false)

  return (
    <EditContext.Provider value={{edit, setEdit, isEdited, setIsEdited}}>
      {children}
    </EditContext.Provider>
  )
}

export default EditContextProvider;