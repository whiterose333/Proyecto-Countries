import React from 'react';
import {Link} from 'react-router-dom';
import styles from "./Landing.module.css"

export default function LandingPage(){
    return(
        <div className={styles.cou}>
            <h1>¡ Welcome to the world !</h1>
            <Link to ='/home'>
                <button className={styles.btn}>get in</button>
            </Link>
        </div>
    )
}