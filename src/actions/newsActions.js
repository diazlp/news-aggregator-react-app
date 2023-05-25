import axios from "axios";
import {
  FETCH_NEWS_API_HEADLINE_REQUEST,
  FETCH_NEWS_API_HEADLINE_SUCCESS,
  FETCH_NEWS_API_HEADLINE_FAILURE
} from './actionTypes'

// Action Creators
export const fetchNewsApiHeadlineRequest = () => ({
  type: FETCH_NEWS_API_HEADLINE_REQUEST,
});

export const fetchNewsApiHeadlineSuccess = (news) => ({
  type: FETCH_NEWS_API_HEADLINE_SUCCESS,
  payload: news,
});

export const fetchNewsApiHeadlineFailure = (error) => ({
  type: FETCH_NEWS_API_HEADLINE_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchNewsApiHeadline = () => async (dispatch) => {
  dispatch(fetchNewsApiHeadlineRequest());

  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/news-api-headline?country=us';

  const { data } = await axios.get(apiUrl)

  try {
    // const news = response.data;
    // dispatch(fetchNewsApiHeadlineSuccess(news));
  } catch (err) {
    // dispatch(fetchNewsApiHeadlineFailure(err.message));
  }

  console.log(data, '<<< data nih boi')
};
