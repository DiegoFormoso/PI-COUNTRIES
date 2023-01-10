import { GET_ALL_COUNTRIES, FILTER_COUNTRIES, ERROR_SERVER, GET_COUNTRY_DETAIL, 
    CREATE_ACTIVITY, GET_ALL_ACTIVITIES, CLEAR_STATES, GET_ALL_CONTINENTS,
    ERROR_FILTER } from "../actions";

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
                erros: {}
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
                error: []
            }

        case CLEAR_STATES :
            return {
                ...state,
                activities : [],
                countries: [],
                counntry: {}
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
