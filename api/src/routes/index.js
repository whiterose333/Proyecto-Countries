const { Router } = require('express');
const axios = require("axios");
const server =require('../app');
const { Activity, Country } = require("../db");



const router = Router();


const countriesAll= async() =>{
    const paises = await Country.findAll({
        include: {
            model: Activity,
            attributes:["name", "difficulty", "duration", "season"],
            through:{
                attributes: [],}
        }
    });
    return paises;
} 



router.get('/countries/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const allCountry= await countriesAll();
    
    let idCountry = await allCountry.filter(elem => elem.id.toLowerCase().includes(id.toLowerCase()));
    if(id){
    idCountry.length ? res.status(200).json(idCountry) :
    res.status(404).send('Country not found')
    }
    console.log(idCountry);
})



router.get('/countries', async(req, res)=>{
    const name= req.query.name;
    
    const allCountries= await countriesAll();


        if(name){
           let paisInfo = await allCountries.filter(elem=>elem.name.toLowerCase().includes(name.toLowerCase()));
               
           paisInfo.length ?
           res.status(200).send(paisInfo):
           res.status(404).send("country not found");
       }else{
           res.status(200).send(allCountries) 
        
            }
       
       
 })


router.post('/activity', async(req, res) => {
    let { name, difficulty, duration, season, country } = req.body
    const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        
        // creo actividad
    });
    //busca paises q asocian a la actividad
    
    let countryDB = await Country.findAll({
       where:{name:country}
        
    });  
    //
    await newActivity.addCountry(countryDB); 
    res.status(200).send('New activity added')

})  

 router.get('/activities', async(req, res) => {
    const name= req.query.name;
    
        const paises = await Activity.findAll({
            where:{name:name},
            include: {
                model: Country,
                attributes:["id", "name", "image", "continent"],
                through:'acti_couns'
            }
        });
        
     res.status(200).send(paises[0].countries)
})  

router.get('/actividades', async(req, res) => {
    
    
    const pai = await Activity.findAll({
        attributes:{exclude: ['id','difficulty','duration','season']}
    }
    );

    const final= pai.map((e) => e.name.toLowerCase());

    const ahoraSi= new Set (final)
    console.log(final)
    console.log(ahoraSi)
    
    const fin= Array.from(ahoraSi)
    console.log(fin)
    
     res.status(200).send(fin)
})





module.exports = router;



