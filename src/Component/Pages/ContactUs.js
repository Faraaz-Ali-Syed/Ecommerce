import React, { useRef } from 'react';
import classes from './ContactUs.module.css';

const ContactUs=(props)=>{
const nameRef=useRef('');
const emailIdRef=useRef('');
const phoneNoRef=useRef('');

const submitHandler=(e)=>{
  e.preventDefault();

const userDetails={
    name:nameRef.current.value,
    emailId:emailIdRef.current.value,
    phoneNo:phoneNoRef.current.value
}

props.onAddUser(userDetails);
nameRef.current.value= "";
emailIdRef.current.value="";
phoneNoRef.current.value=""
}

return(
    <form onSubmit={submitHandler} >
    <div className={classes.control}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" ref={nameRef} />
    </div>
    <div className={classes.control}>
      <label htmlFor="emailid">Email Id</label>
      <input id="emailid" ref={emailIdRef}></input>
    </div>
    <div className={classes.control}>
      <label htmlFor="phone">Phone Number</label>
      <input type="number" id="phone" ref={phoneNoRef} />
    </div>
    <button className={classes.button}>Submit</button>
  </form>
);
}

export default ContactUs;

