const { Router } = require('express');
const {setAllCountriesToDB, getAllCountries, getCountriesByName, getCountryById} = require('../controllers/countryController');
const {addActivity, getAllActivities, getActivityById} = require('../controllers/activityController');
const { Country, Activity } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
var instancia = 0;
router.get('/countries', async(req, res) => {
    const {name} = req.query;

    // Solo en primera instancia carga la base de datos
    try {
        if (instancia === 0){
            await setAllCountriesToDB();
            instancia ++;
        }  
        
        let countries = [];
        if (name)
            countries = await getCountriesByName(name);
        else
            countries = await getAllCountries();

        if (countries.length) return res.status(200).json(countries);
        res.status(404).json({error: `Countries not found with name ${name}`}); 
    }catch(e) {
        res.status(400).json({error: e.message});
    }
});

router.get('/countries/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const country = await getCountryById(id);
        if (country) return res.status(200).json(country);
        res.status(404).json({error: 'Country not found'});
    } catch(e) {
        res.status(400).json({error: e.message});
    }    
});

router.post('/activities', async(req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;

    if (!name || !difficulty || !duration || !season || !countries)
        return res.status(404).json({error: 'Missing obligatory data'});

    try{
        const activity = await addActivity(req.body);
        return res.status(201).json(activity);
    }catch(e){
        res.status(400).json({error: e.message});
    };
});

router.get('/activities', async(req, res) => {
    try {
        const activities = await getAllActivities();
        if (activities.length) return res.status(200).json(activities);
        res.status(404).json({error: "Activities is empty"});
    }catch(e){
        res.status(400).json({error: e.message});
    }
})

router.get('/activities/:id', async(req, res) => {
    const {id}  = req.params;

    //if (!Number.isInteger(id)) return res.status(400).json({e: `${id} is not an Integer`});
    if (isNaN(id)) return res.status(400).json({e: `${id} is not an Integer`});


    try {
        const activity = await getActivityById(id);
        if (activity) return res.status(200).json(activity);
        res.status(404).json({error: 'ACtivity not found'});
    } catch(e) {
        res.status(400).json({error: e.message});
    }    
})

module.exports = router;
