import { GET_ALL_COUNTRIES, GET_COUNTRY } from "../actions";

const initialState = {
    countries: [],
    country: {},
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COUNTRIES : 
            return {
                ...state,
                countries: action.payload
            }

        case GET_COUNTRY :
            return {
                ...state,
                country: action.payload
            }

        default :
            return state;
    };
};

export default rootReducer;
