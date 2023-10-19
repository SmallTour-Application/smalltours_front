export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';
export const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD'; // 검색어 SET
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE'; // 검색 Type 0:패키지 1:가이드
export const SET_SEARCH_TRIGGER = 'SET_SEARCH_TRIGGER'; // 검색페이지 트리거
export const SET_SEARCH_PEOPLE = 'SET_SEARCH_PEOPLE'
export const SET_SEARCH_START = 'SET_SEARCH_START'
export const SET_SEARCH_END = 'SET_SEARCH_END'
export const SET_SEARCH_LOCATION = 'SET_SEARCH_LOCATION'
export const SET_SEARCH_PAGE = 'SET_SEARCH_PAGE'
export const SET_ROLE = 'SET_ROLE'
export const SET_MEMBER_ID = 'SET_MEMBER_ID'
export const SET_ISLOADING = 'SET_ISLOADING'





export const setLoggedIn = (loggedIn) => ({
    type: SET_LOGGED_IN,
    payload: loggedIn,
});

export const setAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
});

export const clearAccessToken = () => ({
    type: CLEAR_ACCESS_TOKEN
});

export const setSearchKeyword = (searchKeyword) => ({
    type: SET_SEARCH_KEYWORD,
    payload: searchKeyword,
})

export const setSearchType = (searchType) => ({
    type: SET_SEARCH_TYPE,
    payload: searchType,
})
export const setSearchTrigger = (searchTrigger) => ({
    type: SET_SEARCH_TRIGGER,
    payload: searchTrigger,
})
export const setSearchPeople = (searchPeople) => ({
    type: SET_SEARCH_PEOPLE,
    payload: searchPeople,
})
export const setSearchStart = (searchStart) => ({
    type: SET_SEARCH_START,
    payload: searchStart,
})
export const setSearchEnd = (searchEnd) => ({
    type: SET_SEARCH_END,
    payload: searchEnd,
})
export const setSearchLocation = (searchLocation) => ({
    type: SET_SEARCH_LOCATION,
    payload: searchLocation,
})
export const setSearchPage = (searchPage) => ({
    type: SET_SEARCH_PAGE,
    payload: searchPage,
})
export const setRole = (role) => ({
    type: SET_ROLE,
    payload: role,
})
export const setMemberId = (memberId) => ({
    type: SET_MEMBER_ID,
    payload: memberId,
})
export const setIsLoading = (isLoading) => ({
    type: SET_ISLOADING,
    payload: isLoading,
})

