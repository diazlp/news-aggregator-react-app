import {
  SET_NEWS_HEADLINE,
  SET_NEWS_HEADLINE_REQUEST,
  SET_NEWS_HEADLINE_SUCCESS,
  SET_NEWS_HEADLINE_FAILURE,
  SET_NEWS_CATEGORIES_HEADLINE,
  SET_FILTERED_NEWS,
  SET_FILTERED_NEWS_REQUEST,
  SET_FILTERED_NEWS_SUCCESS,
  SET_FILTERED_NEWS_FAILURE,
  UNMOUNT_FILTERED_NEWS,
} from "../actions/actionTypes";

const initialState = {
  isHeadlineLoading: false,
  isSearchLoading: false,
  isSearchedNews: false,
  headlines: [],
  categories: [],
  filteredNews: [],
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_HEADLINE:
      return {
        ...state,
        headlines: [...state.headlines, ...action.payload]
      }

    case SET_NEWS_CATEGORIES_HEADLINE:
      return {
        ...state,
        categories: action.payload
      }

    case SET_FILTERED_NEWS:
      return {
        ...state,
        filteredNews: action.payload,
        isSearchedNews: true,
      }

    case UNMOUNT_FILTERED_NEWS:
      return {
        ...state,
        filteredNews: [],
        isSearchedNews: false,
        isSearchLoading: false,
      }

    case SET_NEWS_HEADLINE_REQUEST:
      return {
        ...state,
        isHeadlineLoading: true,
      }

    case SET_NEWS_HEADLINE_SUCCESS:
      return {
        ...state,
        isHeadlineLoading: false,
      }

    case SET_NEWS_HEADLINE_FAILURE:
      return {
        ...state,
        isHeadlineLoading: false
      }

    case SET_FILTERED_NEWS_REQUEST:
      return {
        ...state,
        filteredNews: [],
        isSearchLoading: true
      }

    case SET_FILTERED_NEWS_SUCCESS:
      return {
        ...state,
        isSearchLoading: false,
        isSearchedNews: true,
      }

    case SET_FILTERED_NEWS_FAILURE:
      return {
        ...state,
        isSearchLoading: false,
        isSearchedNews: false,
      }

    default:
      return state;
  }
}

export default newsReducer;
