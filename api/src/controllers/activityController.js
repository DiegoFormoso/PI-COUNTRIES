const { Activity, Country } = require('../db.js');
const { Op } = require('sequelize');


const addActivity = async(data) => {
  const {name, duration, difficulty, season, countries} = data;

  const activityVal = await Activity.findOne({where: {name: name}});
  if (activityVal) 
     throw new Error(`Name ${name} already exists`);

  // Valido campo dificultad, que tenga el valor permitido
  if (difficulty < 1 || difficulty > 5) 
     throw new Error('Difficulty must have a value between 1 and 5');

  // Valido el campo season -- que corresponda al array de ENUM  
  const valuesAcceptedBySeason = Activity.getAttributes().season.values;
  if (valuesAcceptedBySeason.indexOf(season) < 0) 
     throw new Error('Season must have a value within [' + valuesAcceptedBySeason + ']');

  // Valido que vengan paises
  if (!Array.isArray(countries)) 
     throw new Error('Countries must be an Array');
  if (!countries.length) 
     throw new Error('Countries is empty');

  // Finalmente creo la actividad  
  //const activity = await Activity.create(data);
  const [activity, created] = await Activity.findOrCreate({
    where: {name},
    defaults:{
        difficulty,
        duration,
        season,
        },
    });

  let countriesForActivity = [];
  for (let i=0; i < countries.length; i++) {
    c = await Country.findByPk(countries[i].id);
    if (c) countriesForActivity.push(countries[i].id);
  };  

  await activity.addCountries(countriesForActivity);
  return activity;  
}

const getAllActivities = async() => {
   return await Activity.findAll();
}

const getActivityById = async(id) => {
    return await Activity.findByPk(id, {include: Country});
}
 
module.exports = { addActivity, getAllActivities, getActivityById };
 
