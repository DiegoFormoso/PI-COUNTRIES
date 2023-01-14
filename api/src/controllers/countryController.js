const axios  = require('axios');
const { Country, Activity, conn } = require('../db.js');
const { Op, QueryTypes } = require('sequelize');
const countryFields = ['id', 'name', 'continent', 'image', 'population'];

const  setAllCountriesToDB = async() => {
    const response = await axios.get('https://restcountries.com/v3/all');
    let countries = response.data.map((country) => ({
        id: country.cca3,
        name: country.name.common !== null ? country.name.common : 'without Name',
        image: country.flags !== null ? country.length > 1 ? country.flags[1] : country.flags[0] : 'without Flag',
        continent: country.continents !== null ? country.continents[0] : 'without Continent',
        subregion: country.subregion,
        capital: country.hasOwnProperty('capital') ? country.capital[0] : 'without Capital',
        area: country.area,
        population: country.population
    }));
    await Country.bulkCreate(countries);  
}

const getAllCountries = async() => {
    return await Country.findAll({
        attributes: countryFields
    });
}

const getCountriesFiltered = async(name, continent, activity) => {
    const condition = {};
    const where = {};

    // campos que retorno
    condition.attributes = countryFields;

    // filtro por campos de countries
    if (name) where.name = {[Op.iLike] : `%${name}%`};
    if (continent) where.continent = `${continent}`;
    condition.where = where; 

    // filtro por join - tabla relacionada
    if (activity) {
        condition.include = [{
            model: Activity,
            attributes:[],
            where: {
              id: `${activity}`
            }
        }]             
    } 

    return await Country.findAll(condition);
    // return await Country.findAll({
    //     attributes: countryFields,
    //     include: [{
    //         model: Activity,
    //         attributes:[],
    //         where: {
    //           id: `${activity}`
    //         }             
    //     }],
    //     where : {
    //         continent:`${continent}` 
    //     }
    // });
}

const getCountryById = async(id) => {
    return await Country.findByPk(id.toUpperCase(), {include: Activity});
}

const getAllContinents = async() => {
    return await conn.query('SELECT DISTINCT continent FROM countries',
        {
            type: QueryTypes.SELECT
        });
}

module.exports = { setAllCountriesToDB, getAllCountries, getCountriesFiltered,
     getCountryById, getAllContinents};
