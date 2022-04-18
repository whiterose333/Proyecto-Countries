import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postActivity, getCountries} from '../actions';
import styles from "./create.module.css"



function validate(input){
    let error = {};
    if (!input.name){
        error.name = 'a name is required'
    }if(!input.duration){
        error.duration = 'a duration is required'
    }
    return error;
}

function validateCountry(input){
    let errors = [];
    if (!input.country.length !== 0){
        errors.country = 'a country is required'
    } 
    return errors;
}



export default function ActivityCreate(){
    const dispatch = useDispatch();
    const history = useHistory()

    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        //country:""
        country:[]
    })

    const [error, setError] = useState({})
    const [errors, setErrors] = useState({})


    const allCountries = useSelector((state) => state.countries);

    useEffect(()=> {
        dispatch(getCountries())
    }, []);

    function handleOnChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
       console.log(input) 
    }

    function handleSelect(e){
        setInput({
            ...input,
            //country: e.target.value
           country: [...input.country, e.target.value]
        })
        setErrors(validateCountry({
            ...input,
            country :  [...input.country, e.target.value]
        })) 
        
    }

     function handleSelectD(e){
        setInput({
            ...input,
            difficulty:  e.target.value
        })
    } 

    function handleSelectS(e){
        setInput({
            ...input,
            season:  e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postActivity(input))
        alert('activity created !')
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            //country:""
            country:[]
        })
        history.push('/home')

    }

    function handleDelete(e){
        setInput({
            ...input,
            country: input.country.filter(c=> c !== e)
        })
    }




    return(
        <div className={styles.form}>
            <Link className={styles.btn} to='/home'><button>Back</button></Link>
            <h1>Add a new activity</h1>
            <form onSubmit = {(e)=>handleSubmit(e)}>
                <div>
                    <label>NAME:</label>
                    <input className={styles.input} type= "text" value={input.name} name= "name" onChange= {(e)=>handleOnChange(e)}/>
                    {error.name && (
                        <p>{error.name}</p>
                    )}
                </div>
                <div>
                   {/*  <label>DIFFICULTY:</label> */}
                    <select className={styles.select} onChange= {(e)=>handleSelectD(e)}>
                           <option id='dif' disabled hidden selected='select'>DIFFICULTY...</option>
                           <option value= '1'>1</option>
                           <option value='2'>2</option>
                           <option value='3'>3</option>
                           <option value='4'>4</option>
                           <option value='5'>5</option>
                    </select>
                </div>
                <div>
                    <label>DURATION:</label>
                    <input className={styles.input} type= "text" value={input.duration} name= "duration" onChange= {(e)=>handleOnChange(e)}/>
                    {error.duration && (
                        <p>{error.duration}</p>
                    )}
                </div>
                <div>
                    {/* <label>SEASON:</label> */}
                     <select className={styles.select} onChange= {(e)=>handleSelectS(e)}>
                     <option id='sea' disabled hidden selected='select'>SEASON...</option>
                          <option value= 'Summer'>Summer</option>
                           <option value='Autumn'>Autumn</option>
                           <option value='Winter'>Winter</option>
                           <option value='Spring'>Spring</option>
                    </select>
                </div>
                <div>
                    {/* <label>COUNTRIES:</label> */}
                    <select className={styles.select} onChange= {(e) => handleSelect(e)}>
                    <option id='cou' disabled hidden selected='select'>COUNTRIES...</option>
                    {
                        allCountries.map(e=> {
                                return(
                                    <option value= {e.name} key= {e.id}>{e.name} </option>
                                )                            
                        })
                    }
                    </select>{!input.country.length && (
                        <p>{errors.country}</p>
                    )} 
                        
                    
                </div>
                <div>
                    <button type='submit'>CREATE ACTIVITY</button>
                </div>
                <div>
                {input.country.map(e =>
                    <div>
                        <p>{e}</p>
                        <button onClick={()=> handleDelete(e) }>x</button>
                    </div>)}
                    
                   {/* <ul><li>{input.country.map(e => e + " ,")}</li></ul>  */}
                </div>
            </form>
        </div>
    )
}