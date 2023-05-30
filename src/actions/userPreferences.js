import axios from "axios";
import {
  SET_FETCH_USER_PREFERRED_SOURCES,
  SET_POST_USER_PREFERRED_SOURCES,
  SET_DELETE_USER_PREFERRED_SOURCES
} from "./actionTypes";

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