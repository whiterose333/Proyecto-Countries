import React from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries, findByContinents, findPopulation, orderByName, getByActivity, filterCountriesByActivity} from '../actions';
import Country from './Country';
import SearchBar from './SearchBar';
import InputActivity from './InputActivity';
import Paginado from './paginado';
import styles from "./home.module.css"

export default function Home (){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);
    const [order, setOrder] = useState("");
    const [actualPage, setActualPage] =useState(1);//guardar la pagina actual, y un metodo para setear
    const [countriesPerPage, setCountriesPerPage] = useState(10);//guardar cuantos peaises quiero por pagina
    const indexOfLastCountry= actualPage * countriesPerPage;// indice del ultimo pais en la pagina
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;//indice del primer pais en la pagina
    const actualCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);//guarda los ppaises que va
    // tener cada pagina 
    

    /* function handleFilterByActivities(e){
        const valorSelect= e.target.value
        const filteredCountries = [...allCountries].filter((c) => c.activity.name === valorSelect)
        dispatch(filterCountriesByActivity(filteredCountries))
    } */
    
    const paginado = (pageNumber) => {
        setActualPage(pageNumber)
    }


    
 
    
    useEffect(() =>{
        dispatch(getByActivity());
    },[dispatch]) 


    useEffect(() =>{
        dispatch(getCountries());
    },[dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getCountries());
}


function handleFindByContinent(e){
    dispatch(findByContinents(e.target.value))
}

function handleFilterByActivities(e){
    dispatch(filterCountriesByActivity(e.target.value))
}

function handleSortPopulation(e){
    e.preventDefault();
    dispatch(findPopulation(e.target.value));
    setActualPage(1);
    setOrder(`ordered ${e.target.value}`)
}

function handleSortName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setActualPage(1);
    setOrder(`ordered ${e.target.value}`)
    console.log("hola")
}

    return(
        <div className={styles.home}>
            
            <div className={styles.titulo}>
                 <h1>COUNTRIES OF THE WORLD</h1>
                 <button className={styles.btn}><Link to = "/activity">Crear actividad turística</Link></button>
                 <button className={styles.btn} onClick={e=> {handleClick(e)}}>volver a cargar los paises</button> 
            </div>
            
            <div className={styles.filtros}>
                
                {/* <label>order alphabetically</label> */}
                <select className={styles.sel} onChange= {e => handleSortName(e)}>
                    <option id='abc' disabled hidden selected='select'>order alphabetically</option>
                    <option value= 'asc'>A - Z</option>
                    <option value='desc'>Z - A</option>     
                </select>
                {/* <label>filter by continent</label> */}
                <select className={styles.sel} onChange= {e => handleFindByContinent(e)}>
                    <option id='continent' disabled hidden selected='select'>filter by continent</option> 
                    <option value= 'North America'>North America</option>
                    <option value= 'South America'>South America</option>
                    <option value= 'Europe'>Europe</option>
                    <option value= 'Asia'>Asia</option>
                    <option value= 'Oceania'>Oceania</option>
                    <option value= 'Antarctica'>Antarctica</option>
                    <option value= 'Africa'>Africa</option>
                </select>
               {/*  <label>sort by population</label> */}
                <select className={styles.sel} onChange= {e => handleSortPopulation(e)}>
                     <option id='population' disabled hidden selected='select'>sort by population</option>
                    <option value= 'mayor'>Lower-Higher</option>
                    <option value= 'menor'>Higher-Lower </option>
                </select>
                
                {/* <select onChange= {(e) => handleSelect(e)}>
                    <option id='cou' disabled hidden selected='select'>COUNTRIES...</option>
                    {
                        allCountries.map(e=> {
                                return(
                                    <option value= {e.activities.name} key= {e.id}>{e.name} </option>
                                )                            
                        })
                    }
                    </select> */}
                <select className={styles.sel} onChange = {(e)=> handleFilterByActivities(e)} >
                 <option id='population' disabled hidden selected='select'>filter by activity</option>
                    {
                        allActivities.map(elemento=> {
                            
                                return(
                                    <option value= {elemento}>{elemento}</option>
                                )
                            
                            
                        })
                    }
               {
                   /*  <option value= 'activities'>activities</option> */}
                </select>
                </div>    
            <div>
            <Paginado
            countriesPerPage= {countriesPerPage}
            allCountries= {allCountries.length}
            paginado = {paginado}
            />
            
            </div>
            <SearchBar/>
            <div className={styles.paises}>
            {
                actualCountries && actualCountries.map(e => {
                    return(
                        <div className = 'countries'>
                            <Link to= {"/home/" + e.id}>
                                <Country name= {e.name} image= {e.image} continent= {e.continent} key= {e.id}/>
                            </Link>
                        </div>
                    )
                })
            }
            </div>
            
        </div>
    )
}