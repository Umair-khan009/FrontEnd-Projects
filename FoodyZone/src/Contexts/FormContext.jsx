import React, { createContext, useState } from "react";

export const FormContext=createContext()

const FormContextProvider=({children})=>{
  const [form, setForm]=useState(false)
  return (
    <FormContext.Provider value={{form, setForm}}>
      {children}
    </FormContext.Provider>
  )
}

export default FormContextProvider;