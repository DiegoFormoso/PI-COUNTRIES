const axios  = require('axios');
const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');

const  setAllCountriesToDB = async() => {
    const response = await axios.get('https://restcountries.com/v3/all');
    let countries = response.data.map((country) => ({
        id: country.cca3,
        name: country.name.common !== null ? country.name.common : 'without Name',
        image: country.flags !== null ? country.flags[0] : 'without Flag',
        continent: country.continents !== null ? country.continents[0] : 'without Continent',
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

const getCountriesFiltered = async(name, continent) => {
    const condition = {};
    const where = {};
    if (name) where.name = {[Op.iLike] : `%${name}%`};
    if (continent) where.continent = {[Op.eq] : `${continent}`}
    condition.where = where; 
    return await Country.findAll(condition);
}

const getCountryById = async(id) => {
    return await Country.findByPk(id.toUpperCase(), {include: Activity});
}

module.exports = { setAllCountriesToDB, getAllCountries, getCountriesFiltered, getCountryById };
