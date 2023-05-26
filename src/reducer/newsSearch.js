import {
  SET_NEWS_API_HEADLINE,
  SET_NEWS_API_HEADLINE_SUCCESS,
  SET_NEWS_API_HEADLINE_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  headlines: []
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_API_HEADLINE:
      return {
        ...state,
        headlines: [...state.headlines, ...action.payload]
      }

    case SET_NEWS_API_HEADLINE_SUCCESS:
      return {
        ...state,
        loading: true,
      }

    case SET_NEWS_API_HEADLINE_FAILURE:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
}

export default newsReducer;
