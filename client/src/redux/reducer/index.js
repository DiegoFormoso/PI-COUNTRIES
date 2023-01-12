import { GET_ALL_COUNTRIES, FILTER_COUNTRIES, ERROR_SERVER, GET_COUNTRY_DETAIL, 
    CREATE_ACTIVITY, GET_ALL_ACTIVITIES, CLEAR_STATES, GET_ALL_CONTINENTS,
    ERROR_FILTER, ORDER_BY_NAME, ORDER_BY_POPULATION } from "../actions";

const initialState = {
    countries: [],
    country: {},
    activities: [],
    continents: [],
    error: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COUNTRIES : 
            return {
                ...state,
                countries: action.payload,
                error: {}
            }

        case GET_COUNTRY_DETAIL :
            return {
                ...state,
                country: action.payload,
                error: {}
            }

        case FILTER_COUNTRIES :
            return {
                ...state,
                countries: action.payload,
                error: {}
            }

        case GET_ALL_CONTINENTS :
            return {
                ...state,
                continents: action.payload,
                error: {}
            }

        case CREATE_ACTIVITY : 
            return {
                ...state,
                activities: [...state.activities, action.payload],
                error: {}
            }

        case GET_ALL_ACTIVITIES :
            return {
                ...state,
                activities: action.payload,
                error: {}
            }

        case CLEAR_STATES :
            return {
                ...state,
                //activities : [],
                //countries: [],
                counntry: {}
            }   

        case ORDER_BY_NAME :
            let sortedCountriesByName = state.countries.sort(
                function(c1, c2) {
                    const numberOrder = action.payload === 'asc' ? 1 : -1;
                    if (c1.name.toUpperCase() > c2.name.toUpperCase()) return numberOrder;
                    if (c1.name.toUpperCase() < c2.name.toUpperCase()) return (-1 * numberOrder);
                    return 0;
                } 
            );

            return {
                ...state,
                countries: sortedCountriesByName
            }

        case ORDER_BY_POPULATION :
            let sortedCountriesByPopulation = state.countries.sort(
                function(c1, c2) {
                    if (action.payload === 'asc')
                       return c1.population - c2.population
                    else
                       return c2.population - c1.population;   
                } 
            );
            
            return {
                ...state,
                countries: sortedCountriesByPopulation
            }

        case ERROR_SERVER :
            return {
                ...state,
                error: action.payload
            }

        case ERROR_FILTER :
            return {
                ...state,
                error: action.payload,
                countries: []
            }

        default :
            return state;
    };
};

export default rootReducer;
