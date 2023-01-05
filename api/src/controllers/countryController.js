const axios  = require('axios');
const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');

const  setAllCountriesToDB = async() => {
    const response = await axios.get('https://restcountries.com/v3/all');
    let countries = response.data.map((country) => ({
        id: country.cca3,
        name: country.name.common !== null ? country.name.common : 'without Name',
        image: country.flags !== null ? country.flags[0] : 'without Flag',
        region: country.region !== null ? country.region : 'without Region',
        subregion: country.subregion,
        capital: country.hasOwnProperty('capital') ? country.capital[0] : 'without Capital',
        area: country.area,
        population: country.population
    }));
    await Country.bulkCreate(countries);  
}

const getAllCountries = async() => {
    return await Country.findAll();
}

const getCountriesByName = async(name) => {
    const condition = {};
    const where = {};
    where.name = {[Op.iLike] : `%${name}%`};
    condition.where = where; 
    return await Country.findAll(condition);
}

const getCountryById = async(id) => {
    return await Country.findByPk(id.toUpperCase(), {include: Activity});
}

module.exports = { setAllCountriesToDB, getAllCountries, getCountriesByName, getCountryById };
