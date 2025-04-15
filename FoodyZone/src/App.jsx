import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './Components/Styles.css'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import FoodProvider from './Contexts/FoodContext'
import ProtectedRoutes from './Utils/ProtectedRoutes'
import FormContextProvider from './Contexts/FormContext'
import EditContextProvider from './Contexts/EditContext'

const App = () => {
  return (
    <>
    <FoodProvider>
      <EditContextProvider>
        <FormContextProvider>
      <Routes>
         <Route path='/login' element={<Login />}/>
         <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />} />

       <Route element={<ProtectedRoutes />} >
         <Route path='/home' element={<Home />} />
       </Route>
     </Routes>
        </FormContextProvider>
      </EditContextProvider>
    </FoodProvider> 
    </>
  )
}

export default App