import { GET_ALL_COUNTRIES, FILTER_COUNTRIES, SERVER_ERROR, GET_COUNTRY_DETAIL, 
    CREATE_ACTIVITY, GET_ALL_ACTIVITIES, FILTER_ERROR, CLEAR_STATES,
    ORDER_BY_NAME, ORDER_BY_POPULATION, 
    ORDER_BY_NAME_ASC, ORDER_BY_NAME_DESC, 
    ORDER_BY_POPULATION_ASC} from "../actions/constants";

const initialState = {
    countries: [],
    country: {},
    activities: [],
    error: {},
    orderBy: ORDER_BY_NAME_ASC
};

const handleCountriesOrderByName = (countries, orderBy) => {
    return countries.sort(
        function(c1, c2) {
            const numberOrder = orderBy === ORDER_BY_NAME_ASC ? 1 : -1;
            if (c1.name.toUpperCase() > c2.name.toUpperCase()) return numberOrder;
            if (c1.name.toUpperCase() < c2.name.toUpperCase()) return (-1 * numberOrder);
            return 0;
        } 
    );
};

const handleCountriesOrderByPopulation = (countries, orderBy) =>{
    return countries.sort(
        function(c1, c2) {
            if (orderBy === ORDER_BY_POPULATION_ASC)
                return c1.population - c2.population
            else
                return c2.population - c1.population;   
        } 
    );
};

const handleCountriesOrdered = (countries, orderBy) => {
    if (orderBy === ORDER_BY_NAME_ASC || orderBy === ORDER_BY_NAME_DESC) 
        return  handleCountriesOrderByName(countries, orderBy)
    else    
        return handleCountriesOrderByPopulation(countries, orderBy);    
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COUNTRIES : 
            return {
                ...state,
                countries: handleCountriesOrdered(action.payload, state.orderBy),
                error: {}
            }

        case FILTER_COUNTRIES :
            return {
                ...state,
                countries: handleCountriesOrdered(action.payload, state.orderBy),
                error: {}
            }

        case GET_COUNTRY_DETAIL :
            return {
                ...state,
                country: action.payload,
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

        case ORDER_BY_NAME :
            return {
                ...state,
                countries: handleCountriesOrderByName(state.countries, action.payload),
                orderBy: action.payload
            }

        case ORDER_BY_POPULATION :           
            return {
                ...state,
                countries: handleCountriesOrderByPopulation(state.countries, action.payload),
                orderBy: action.payload
            }

        case CLEAR_STATES :
            return {
                ...state,
                country: {},
            }

        case SERVER_ERROR :
            return {
                ...state,
                error: action.payload
            }

        case FILTER_ERROR :
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
