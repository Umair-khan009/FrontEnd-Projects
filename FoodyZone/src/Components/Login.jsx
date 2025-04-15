import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // Redirect if already logged in
    }
  }, [navigate]);

  const loginUser = async (data) => { // Pass data directly
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (response.user) {
        const token = await response.user.getIdToken();
        localStorage.setItem("token", token);
        navigate('/home'); // Redirect on first successful login
      }
    } catch (error) {
      alert('Email or password is incorrect');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      {loading && <Loader />}
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit(loginUser)}> {/* Call loginUser directly */}
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
              message: 'Email length exceeded'
            }
          })}
          placeholder="Email"
        />
        {errors.email && <p className='error'>{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required"
            },
            maxLength: {
              value: 15,
              message: "Password length exceeded (Max 15)"
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
              message: "Incorrect password"
            }
          })}
          placeholder="Password"
        />
        {errors.password && <p className='error'>{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting": "Sign in"}</button>

        <div className='link-wrap'>
          <span>Don't have an account?</span>
          <Link className='link' to='/Register'>Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
