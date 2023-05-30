import {
  SET_FETCH_USER_PREFERRED_SOURCES,
  SET_POST_USER_PREFERRED_SOURCES,
  SET_DELETE_USER_PREFERRED_SOURCES
} from "../actions/actionTypes";

const initialState = {
  preferredCategories: [],
  preferredAuthors: [],
  preferredSources: [],
}

const userPreferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCH_USER_PREFERRED_SOURCES:
      return {
        ...state,
        preferredSources: action.payload
      }

    case SET_POST_USER_PREFERRED_SOURCES:
      return {
        ...state,
        preferredSources: [...state.preferredSources, action.payload]
      }

    case SET_DELETE_USER_PREFERRED_SOURCES:
      return {
        ...state,
        preferredSources: state.preferredSources.filter(({ value }) => value !== action.payload)
      }

    default:
      return state;
  }
}

export default userPreferencesReducer;
