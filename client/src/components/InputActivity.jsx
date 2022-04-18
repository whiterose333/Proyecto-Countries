import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNameActivity} from '../actions';

export default function InputActivity(){
    const dispatch =useDispatch()
    const [activity,setActivity] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setActivity(e.target.value)
        console.log(activity)
        
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameActivity(activity))
        
    }

    return (
        <div>
        <input type = 'text' placeholder = "escribe la actividad" onChange= {(e) => handleInputChange(e)}/>
        <button type='submit' onClick= {(e) => handleSubmit(e)} >buscar</button>
        </div>
    )
}