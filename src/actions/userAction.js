import axios from "axios";
import {
  SET_USER_REGISTER_REQUEST,
  SET_USER_REGISTER_SUCCESS,
  SET_USER_REGISTER_FAILURE,
  SET_USER_LOGIN_REQUEST,
  SET_USER_LOGIN_SUCCESS,
  SET_USER_LOGIN_FAILURE,
} from '../actions/actionTypes'

// Action Creators
export const postUserRegisterRequest = () => ({
  type: SET_USER_REGISTER_REQUEST
})

export const postUserRegisterSuccess = () => ({
  type: SET_USER_REGISTER_SUCCESS
})

export const postUserRegisterFailure = () => ({
  type: SET_USER_REGISTER_FAILURE
})

export const postUserLoginRequest = () => ({
  type: SET_USER_LOGIN_REQUEST
})

export const postUserLoginSuccess = () => ({
  type: SET_USER_LOGIN_SUCCESS
})

export const postUserLoginFailure = () => ({
  type: SET_USER_LOGIN_FAILURE
})

export const postUserRegister = (payload) => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/register';
  dispatch(postUserLoginRequest())

  try {

    dispatch(postUserRegisterSuccess())
  } catch (err) {
    dispatch(postUserLoginFailure())
  }
}