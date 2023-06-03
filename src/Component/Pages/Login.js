import { useState,useRef, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import classes from './Login.module.css';
import AuthContext from '../Store/AuthContext';
import CartContext from '../Store/CartContext';

const Login = () => {
  const navigate =useNavigate();
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  
  const loginCtx=useContext(AuthContext);
const cartCtx=useContext(CartContext);

const[isLogin,setIsLogin]=useState(true);
const[isLoading,setIsLoading] =useState(false);

useEffect(()=>{
  if(localStorage.getItem('userEmail')){
    setIsLogin(true)
    navigate('/store')
  }
},[navigate])
  
const switchAuthModeHandler=()=>{
  setIsLogin((prevState)=>!prevState);
}

  const submitHandler=(event)=>{
    event.preventDefault();
const enteredEmail = emailInputRef.current.value;
const enteredPassword = passwordInputRef.current.value;

cartCtx.userIdentifier(enteredEmail)
setIsLoading(true)

let url;
if (isLogin) {
  url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChWUSHd-NX-mtmFai1XcEx55r4eWuhDZ4"
} else {
   url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChWUSHd-NX-mtmFai1XcEx55r4eWuhDZ4"
}
fetch(
   url,
   {
     method: 'POST',
     body: JSON.stringify({
       email: enteredEmail,
       password: enteredPassword,
       returnSecureToken: true,
     }),
     headers: {
       'Content-Type': "application/json",
     },
   }
 ).then((res) => {
   setIsLoading(false)
   if (res.ok) {
     console.log('logged in')
       return res.json()
       
   } else {
     return res.json().then((data) => {
      let errorMessage = 'Authentication failed!';
   //    if(data&& data.error && data.error.message){
   //     errorMessage = data.error.message;
      throw new Error(errorMessage);
      })
      
   }
 })
 .then((data)=>{
   loginCtx.login(data.idToken)
   navigate('/store')
 })
 .catch((err)=>{
   alert(err.message)
 })
}

  return (
    <section className={classes.auth}>
       <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form  onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required 
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>} 
        {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin  ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;