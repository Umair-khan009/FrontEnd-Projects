import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: {errors, isSubmitting} }=useForm()

  const navigate= useNavigate()

const createUser= async (data)=>{
  try{
    const response=await createUserWithEmailAndPassword(auth, data.email, data.password)
    if(response.user.accessToken){
      navigate('/Login')
    }else{
      alert('Create your account first')
    }
  }catch(error){
    alert('Email Already exist')
    console.log(error.message)
  }

}

  return (
    <div className="signup-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit(createUser)}>
        <input 
        type="text" 
        {...register('name',{
          required: "Name is required",
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
        placeholder="name"   
        />
        {errors.name && <p className='error'>{errors.name.message}</p>}
        <input 
        type="email" 
        {...register("email", { 
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9]{3,}@(?:gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/,
            message: 'Invalid email'
          },
          maxLength: {
            value: 25,
            message: 'Email lenght exceeded'
          }
        })}
        placeholder="Email"
        />
      {/* Show error message if email is invalid */}
      {errors.email && <p className='error'>{errors.email.message}</p>}

        <input 
        type="password" 
        {...register('password', {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum 6 character required"
          },
          maxLength: {
            value: 15,
            message: "Password length exceeded (Max 15)"
          },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
            message: "Must contain 1 capital letter & 1 symbol"
          }
        })}
        placeholder="Password" 
         />
         {errors.password && <p className='error'>{errors.password.message}</p> }
        
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting": "Submit"}</button>

        <div className='link-wrap'>
          <span>Already have an account</span>
          <Link className='link' to="/Login">Sign in</Link>
        </div>
      </form>
    </div>
  )
}

export default Register