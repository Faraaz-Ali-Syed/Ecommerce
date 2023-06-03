import React, { useContext } from 'react';
import { Navbar,Nav,Button } from 'react-bootstrap';
import classes from './Header.module.css';
import CartContext from '../Store/CartContext';
import {NavLink, useNavigate} from 'react-router-dom';
import AuthContext from '../Store/AuthContext';

const Header=(props)=>{
const navigate=useNavigate()
const loginCtx=useContext(AuthContext)
  const cartCtx = useContext(CartContext);
  let quantity=0;
  cartCtx.items.forEach(item =>{
    quantity=quantity+Number(item.quantity)
 })

 const logoutHandler = () =>{
  loginCtx.logout()
  navigate('/login')
}

return (
    <>
        <Navbar bg="light" variant="light" className='justify-content-center'>
          
             <Nav className={classes.nav} >
               <NavLink className={classes.but} to="/home">Home</NavLink>
               <NavLink className={classes.but} to="/About">About</NavLink>

               <NavLink className={classes.but} to='/ContactUs'>Contact Us</NavLink>
               {!loginCtx.isLoggedIn && <NavLink variant="outline-primary" className={classes.butl} to ="/Login">Login</NavLink>}
              {loginCtx.isLoggedIn && <NavLink className={classes.but} to="/store">Store</NavLink>}
               
               </Nav>
             <div>
             {loginCtx.isLoggedIn &&<Button variant="outline-primary" onClick={logoutHandler}>Logout</Button>}
             </div>
             
            
          <div className={classes['flex-end']}>
            
            
             <Button variant="outline-primary" style={{float:"right"}} onClick={props.onClick}>Cart <span className={classes.span}>{!loginCtx.isLoggedIn && '(Please Login to see your cart)'}
              {loginCtx.isLoggedIn && quantity}</span></Button>
             </div>
             
           </Navbar>
           <div style={{
             backgroundColor:'black',
            textAlign:'center',
            height: '19vh'
           }}>
   <h1 style={{fontSize:'95px', 
   color: 'white', 
   fontFamily:'serif', 
   fontWeight: 'bold'}}>The Generics</h1>
           </div>
           </>
)
        }

        export default Header;
         