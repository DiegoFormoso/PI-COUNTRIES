import { GET_ALL_COUNTRIES, GET_COUNTRY, FILTER_COUNTRIES, ERROR_SERVER } from "../actions";

const initialState = {
    countries: [],
    country: {},
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

        case GET_COUNTRY :
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

        case ERROR_SERVER :
            return {
                ...state,
                countries: [],
                error: action.payload
            }

        default :
            return state;
    };
};

export default rootReducer;
