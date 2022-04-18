import React from "react";
import styles from "./home.module.css"


export default function Country({ image, name, continent }){
    return(
        <div className={styles.pais}>
            <h3>{name}</h3>
            <h5>{continent}</h5>
            <img src={image} height= "100rem" alt="image not found" />
        </div>
    )
}