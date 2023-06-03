import React from 'react';
import classes from './Footer.module.css'
const Footer = () => {
    return (
      <footer>
        <div className={classes["footer-title"]}>The Generics</div>
        <div className={classes["footer-icons"]}>
          <ul>
            <li>
              <a href="https://www.youtube.com">
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/1384/1384060.png"}
                  alt="youtube"
                />
              </a>
            </li>
            <li>
              <a href="https://spotify.com">
                <img
                  src={"https://cdn-icons-png.flaticon.com/512/174/174872.png"}
                  alt="spotify"
                />
              </a>
            </li>
            <li>
              <a href="https://facebook.com">
                <img
                  src={"https://cdn-icons-png.flaticon.com/128/4494/4494475.png"}
                  alt="facebook"
                />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  };
  
  export default Footer;