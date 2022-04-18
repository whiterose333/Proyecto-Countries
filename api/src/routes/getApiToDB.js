const axios = require("axios");

const { Activity, Country } = require("../db");


const getApiData = async()=> {
    try {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    //console.log("me devuelve la api")
    /* const xxx = await apiUrl.data.map(elem => elem.cca3);     
    console.log(xxx) */
    const apiData = await apiUrl.data.map(elem => {
        
        return {
            id: elem.cca3,
            name: elem.name.common,
            image: elem.flags[1],
            continent: elem.continents[0],
            capital:elem.capital? elem.capital[0]: "No tiene capital",
            subregion: elem.subregion,
            area: elem.area,
            population: elem.population,

            
            
        };
    });

     const paises = await Country.bulkCreate(apiData); 

      //console.log("funciona")
    return apiData;
  } catch(error){
      console.log(error);
  }


  
}
console.log("funciona")

module.exports = {
    getApiData,
};