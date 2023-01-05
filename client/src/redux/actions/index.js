export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';

export const getCountries = () =>  {
    return function(dispatch) {
        return fetch("http://localhost:3001/countries")
        .then (response => response.json())
        .then (data => dispatch({type: GET_ALL_COUNTRIES, payload:data}))
        .catch(err => console.log(err))
    }
};

export const getCountry = (id) => {
    return function(dispatch) {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then (response => response.json())
        .then (data => dispatch({type: GET_COUNTRY, payload:data}))
        .catch(err => console.log(err))
    }
};

