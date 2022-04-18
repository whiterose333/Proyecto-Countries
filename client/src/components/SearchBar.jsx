import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNameCountries} from '../actions';
import styles from "./create.module.css"

export default function SearchBar(){
    const dispatch =useDispatch()
    const [name,setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
        
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
        
    }

    return (
        <div>
        <input className={styles.select} type = 'text' placeholder = "search country" onChange= {(e) => handleInputChange(e)}/>
        <button type='submit' onClick= {(e) => handleSubmit(e)} >search</button>
        </div>
    )
}