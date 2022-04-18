const initialState = {
    countries : [],
    countriesAll: [],
    detail: [],
    activities: []
}
function rootReducer (state= initialState, action){
    switch(action.type){
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                countriesAll: action.payload
            }
       case "GET_BY_ACTIVITY":
                return{
                    ...state,
                    activities: action.payload
                }
        case "GET_ACTIVITY_COUNTRIES":
             return{
                    ...state,
                    countries: action.payload
            } 
        case "GET_NAME_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                
            }
        case "GET_NAME_ACTIVITY":
            return{
                ...state,
                countries: action.payload,
                
            }
        case "FIND_BY_CONTINENTS":
            const allCountries = state.countriesAll
            const statusFiltered= allCountries.filter(e => e.continent === action.payload)
            return{
                ...state,
                countries:statusFiltered
            }
        case "FIND_POPULATION":
                let sortPopulation = action.payload === 'mayor' ? state.countries.sort(function (a, b){
                    if (a.population > b.population){
                        return 1;
                    }
                    if (b.population > a.population){
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b){
                    if (a.population > b.population){
                        return -1;
                    }
                    if (b.population > a.population){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    countries: sortPopulation
                }
        case "POST_ACTIVITY":
            return {
                ...state
            }
        case "ORDER_BY_NAME":
            let sortCountries = action.payload === 'asc' ? state.countries.sort(function (a, b){
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function (a, b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: sortCountries
            }
            case "FIND_DETAIL":
                return{
                    ...state,
                    detail: action.payload
                }
        default:
            return state;
    }
}

export default rootReducer;