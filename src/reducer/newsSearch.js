import {
  SET_NEWS_API_HEADLINE,
  SET_NEWS_API_HEADLINE_SUCCESS,
  SET_NEWS_API_HEADLINE_FAILURE,
  SET_NEWS_CATEGORIES_HEADLINE,
  SET_FILTERED_NEWS_API,
  UNMOUNT_FILTERED_NEWS_API
} from "../actions/actionTypes";

const initialState = {
  isLoadingHeadline: true,
  isSearchedNews: false,
  headlines: [],
  categories: [],
  filteredNews: [],
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_API_HEADLINE:
      return {
        ...state,
        headlines: [...state.headlines, ...action.payload]
      }

    case SET_NEWS_CATEGORIES_HEADLINE:
      return {
        ...state,
        categories: action.payload
      }

    case SET_FILTERED_NEWS_API:
      return {
        ...state,
        filteredNews: action.payload,
        isSearchedNews: true,
      }

    case UNMOUNT_FILTERED_NEWS_API:
      return {
        ...state,
        filteredNews: [],
        isSearchedNews: false,
      }

    case SET_NEWS_API_HEADLINE_SUCCESS:
      return {
        ...state,
        isLoadingHeadline: false,
      }

    case SET_NEWS_API_HEADLINE_FAILURE:
      return {
        ...state,
        isLoadingHeadline: false
      }

    default:
      return state;
  }
}

export default newsReducer;
