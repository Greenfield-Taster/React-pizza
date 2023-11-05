import React from 'react';
import { Link } from "react-router-dom";

import styles from './NotFoundBlock.module.scss';

 const NotFoundBlock = () => {
  return (
        <div className={styles.root}>
          <h1 >
              <span>😕</span>
              <br/>
              Not Found
          </h1>
            <p>We apologize, but the page you are looking for could not be found. Please, check the URL path or try navigating back to the <Link to="React-pizza/">homepage</Link> .</p>
        </div>
  )
}
export default NotFoundBlock;