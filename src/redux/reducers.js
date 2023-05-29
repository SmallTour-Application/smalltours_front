import dayjs from "dayjs";

const initialState = {
    accessToken: null,
    searchKeyword: "",
    searchType:0,
    searchTrigger:false,
    searchPeople:1,
    searchStart:null,
    searchEnd:null,
    searchLocation:"",
    searchPage:1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.payload,
            };
        case 'CLEAR_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: null,
            };
        case 'SET_SEARCH_KEYWORD':
            return{
                ...state,
                searchKeyword: action.payload,
            };
        case 'SET_SEARCH_TYPE':
            return{
                ...state,
                searchType: action.payload,
            };
        case 'SET_SEARCH_TRIGGER':
            return{
                ...state,
                searchTrigger: action.payload,
            };
        case 'SET_SEARCH_PEOPLE':
            return{
                ...state,
                searchPeople: action.payload,
            };
        case 'SET_SEARCH_START':
            return{
                ...state,
                searchStart: action.payload,
            };
        case 'SET_SEARCH_END':
            return{
                ...state,
                searchEnd: action.payload,
            };
        case 'SET_SEARCH_LOCATION':
            return{
                ...state,
                searchLocation: action.payload,
            };
        case 'SET_SEARCH_PAGE':
            return{
                ...state,
                searchPage: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;