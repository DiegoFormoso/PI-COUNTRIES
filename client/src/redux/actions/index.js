import axios from 'axios';

import { GET_ALL_COUNTRIES, FILTER_COUNTRIES, SERVER_ERROR, GET_COUNTRY_DETAIL, 
    CREATE_ACTIVITY, GET_ALL_ACTIVITIES, GET_ALL_CONTINENTS, FILTER_ERROR, 
    ORDER_BY_NAME, ORDER_BY_POPULATION, CLEAR_STATES } from "./constants";

export const getCountries = () =>  {
    return function(dispatch) {
        return fetch("http://localhost:3001/countries")
        .then (response => response.json())
        .then (data => dispatch({type: GET_ALL_COUNTRIES, payload:data}))
        .catch(e => dispatch({type: SERVER_ERROR, payload: e.message}))
    }
};

export const getCountryDetail = (id) => {
    return function(dispatch) {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then (response => response.json())
        .then (data => dispatch({type: GET_COUNTRY_DETAIL, payload:data}))
        .catch(e => dispatch({type: SERVER_ERROR, payload: e.message}))
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
                  dispatch({type: FILTER_ERROR, payload:data});
               else    
                  dispatch({type: FILTER_COUNTRIES, payload:data});
            })
        .catch(e => {
            dispatch({type: SERVER_ERROR, payload: e.message});
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
                dispatch({type: SERVER_ERROR, payload: e.message})
            })
    }
};

export const createActivity = (activity) => {
    return ({type: CREATE_ACTIVITY,  payload: activity});
};

export const getAllActivities = () => {
    return function(dispatch) {
        axios.get('http://localhost:3001/activities')
            .then(response => {
                dispatch({type: GET_ALL_ACTIVITIES, payload: response.data})
            })
            .catch(e => {
                dispatch({type: SERVER_ERROR, payload: e.message})
            })
    }
}

export const countriesOrderByName = (typeOrder) => {
    return ({type: ORDER_BY_NAME, payload: typeOrder});
}

export const countriesOrderByPopulation = (typeOrder) => {
    return ({type: ORDER_BY_POPULATION,  payload: typeOrder});
}

export const clearStates = () => {
    return ({type: CLEAR_STATES});
}