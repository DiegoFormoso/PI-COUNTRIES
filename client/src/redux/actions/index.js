import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const FILTER_COUNTRIES = 'FILTER_COUNTRIES';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const CLEAR_STATES = 'CLEAR_STATES';
export const GET_ALL_CONTINENTS = 'GET_ALL_CONTINENTS';
export const ERROR_SERVER = 'ERROR_SERVER';
export const ERROR_FILTER = 'ERROR_FILTER';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';

export const getCountries = () =>  {
    return function(dispatch) {
        return fetch("http://localhost:3001/countries")
        .then (response => response.json())
        .then (data => dispatch({type: GET_ALL_COUNTRIES, payload:data}))
        .catch(err => console.log(err))
    }
};

export const getCountryDetail = (id) => {
    return function(dispatch) {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then (response => response.json())
        .then (data => dispatch({type: GET_COUNTRY_DETAIL, payload:data}))
        .catch(err => console.log(err))
    }
};

export const filterCountries = (name, continent, activity) => {
    if (!name) name = "";
    if (!continent) continent = "";
    if (!activity) activity = "";
    return function(dispatch) {
        return fetch(`http://localhost:3001/countries?name=${name}&continent=${continent}&activity=${activity}`)
        .then (response => response.json())
        .then (data => 
            {
               if (data.hasOwnProperty('error'))  
                  dispatch({type: ERROR_FILTER, payload:data});
               else    
                  dispatch({type: FILTER_COUNTRIES, payload:data});
            })
        .catch(err => {
            console.log(err);
        })
    }
};

export const getAllContinents = () => {
    return function(dispatch) {
        axios.get('http://localhost:3001/continents')
            .then(response => {
                dispatch({type: GET_ALL_CONTINENTS, payload: response.data})
            })
            .catch(e => {
                dispatch({type: ERROR_SERVER, payload: e.message})
            })
    }
};

export const createActivity = (activity) => {
    return async function(dispatch) {
       await axios.post('http://localhost:3001/activities', activity)
        .then(data => {dispatch({type: CREATE_ACTIVITY, payload: data.data})})
        .catch(e => {
            console.log(e.response.data);
            dispatch({type: ERROR_SERVER, payload:e.response.data})
        })
    } 
};

export const getAllActivities = () => {
    return function(dispatch) {
        axios.get('http://localhost:3001/activities')
            .then(response => {
                dispatch({type: GET_ALL_ACTIVITIES, payload: response.data})
            })
            .catch(e => {
                dispatch({type: ERROR_SERVER, payload: e.message})
            })
    }
}

export const clearStates =() => {
    return ({type: CLEAR_STATES, payload: []});
}

export const countriesOrderByName = (typeOrder) => {
    return ({type: ORDER_BY_NAME, payload: typeOrder});
}

export const countriesOrderByPopulation = (typeOrder) => {
    return ({type: ORDER_BY_POPULATION,  payload: typeOrder});
}