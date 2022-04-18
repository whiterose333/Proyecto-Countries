import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findDetail} from '../actions';
import styles from "./detail.module.css"

export default function Detail(props){

    const dispatch =useDispatch()
    

    useEffect(() => {
        dispatch(findDetail(props.match.params.id));
    },[dispatch])

    const myCountry = useSelector((state) => state.detail)

    return(
        <div>
            
            {
                myCountry.length > 0 ?
                <div  className={styles.detail} key={myCountry[0].id}>
                    <Link to='/home'>
                <button className={styles.btn}>BACK</button>
            </Link>
                    <div>
                    <h1>{myCountry[0].name}</h1>
                    <img src={myCountry[0].image} />
                    <h3>code: {myCountry[0].id}</h3>
                    <h3>continent: {myCountry[0].continent}</h3>
                    <h3>capital: {myCountry[0].capital? myCountry[0].capital: "- without capital -"}</h3>
                    <h3>subregion: {myCountry[0].subregion? myCountry[0].subregion: "- without subregion -" }</h3>
                    <h3>area: {myCountry[0].area}  km²</h3>
                    <h3>population: {myCountry[0].population}</h3>
                    </div>

                    <div className={styles.activity}>
                        <h2>ACTIVITIES</h2>
                        {myCountry[0].activities.length? myCountry[0].activities.map(e => {
                            return(
                                <div className={styles.paisAct}>
                                   <h3>name:{e.name}</h3>
                                   <h3>difficulty: {e.difficulty}</h3>
                                   <h3>duration: {e.duration}</h3>
                                   <h3>season: {e.season}</h3>
                                </div>
                            )
                            
                        }) :
                        "has no associated activities"} 
                    </div>
                </div>:""
            }
            
        </div>
    )
}