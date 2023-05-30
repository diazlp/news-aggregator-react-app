import axios from "axios";
import {
  SET_FETCH_USER_PREFERRED_CATEGORIES,
  SET_POST_USER_PREFERRED_CATEGORIES,
  SET_DELETE_USER_PREFERRED_CATEGORIES,
  SET_FETCH_USER_PREFERRED_SOURCES,
  SET_POST_USER_PREFERRED_SOURCES,
  SET_DELETE_USER_PREFERRED_SOURCES,
  UNMOUNT_USER_PREFERRED_SETTINGS
} from "./actionTypes";

export const unmountUserPreferences = () => ({
  type: UNMOUNT_USER_PREFERRED_SETTINGS
})

export const fetchUserPreferredCategories = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-categories-preferences?user_id=${payload.user_id}`

  const { data: preferredCategories } = await axios.get(apiUrl)
  dispatch({
    type: SET_FETCH_USER_PREFERRED_CATEGORIES,
    payload: preferredCategories
  })
}

export const postUserPreferredCategories = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-categories-preferences`
  const { data: preferredCategories } = await axios.post(apiUrl, payload)

  dispatch({
    type: SET_POST_USER_PREFERRED_CATEGORIES,
    payload: {
      value: preferredCategories.value,
      label: preferredCategories.label
    }
  })
}

export const deleteUserPreferredCategories = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-categories-preferences?user_id=${payload.user_id}&value=${payload.value}`
  const { data: preferredCategories } = await axios.delete(apiUrl)

  dispatch({
    type: SET_DELETE_USER_PREFERRED_CATEGORIES,
    payload: preferredCategories.value
  })
}

export const fetchUserPreferredSources = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-sources-preferences?user_id=${payload.user_id}`

  const { data: preferredSources } = await axios.get(apiUrl)
  dispatch({
    type: SET_FETCH_USER_PREFERRED_SOURCES,
    payload: preferredSources
  })
}

export const postUserPreferredSources = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-sources-preferences`
  const { data: preferredSources } = await axios.post(apiUrl, payload)

  dispatch({
    type: SET_POST_USER_PREFERRED_SOURCES,
    payload: {
      value: preferredSources.value,
      label: preferredSources.label
    }
  })
}

export const deleteUserPreferredSources = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/user-sources-preferences?user_id=${payload.user_id}&value=${payload.value}`
  const { data: preferredSources } = await axios.delete(apiUrl)

  dispatch({
    type: SET_DELETE_USER_PREFERRED_SOURCES,
    payload: preferredSources.value
  })
}