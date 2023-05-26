import axios from "axios";
import {
  SET_NEWS_API_HEADLINE,
  SET_NEWS_API_HEADLINE_SUCCESS,
  SET_NEWS_API_HEADLINE_FAILURE,
} from './actionTypes'

// Action Creators
export const fetchNewsApiHeadlineSuccess = () => ({
  type: SET_NEWS_API_HEADLINE_SUCCESS,
});

export const fetchNewsApiHeadlineFailure = () => ({
  type: SET_NEWS_API_HEADLINE_FAILURE,
});

// Thunk Action Creator
export const fetchNewsApiHeadline = () => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/news-api-headline?country=us';

  const { data } = await axios.get(apiUrl)

  try {
    const filteredArticles = data.articles.filter(article => {
      return (
        article.source?.name &&
        article.author &&
        article.title &&
        article.description &&
        article.url &&
        article.urlToImage &&
        article.publishedAt
      );
    });

    const news = filteredArticles.map(article => ({
      ...article,
      title: article.title.split('-').slice(0, -1).join('').trim(),
      source: article.source.name,
      imageUrl: article.urlToImage,
      createdDate: article.publishedAt,
    }))

    dispatch({
      type: SET_NEWS_API_HEADLINE,
      payload: news
    })
    dispatch(fetchNewsApiHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsApiHeadlineFailure());
  }
};

export const fetchTheGuardianApiHeadline = () => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/guardian';

  const { data } = await axios.get(apiUrl)

  try {
    const filteredArticles = data.response?.results.filter(article => {
      return (
        article.webTitle &&
        article.fields?.trailText &&
        article.webUrl &&
        article.fields?.thumbnail &&
        article.webPublicationDate
      );
    });

    const news = filteredArticles.map(article => ({
      ...article,
      title: article.webTitle,
      source: 'The Guardian',
      author: 'The Guardian',
      description: article.fields?.trailText,
      imageUrl: article.fields?.thumbnail,
      url: article.webUrl,
      createdDate: article.webPublicationDate,
    }))

    dispatch({
      type: SET_NEWS_API_HEADLINE,
      payload: news
    })
    dispatch(fetchNewsApiHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsApiHeadlineFailure());
  }
};

export const fetchNewYorkTimesApiHeadline = () => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/nyt-home';

  const { data } = await axios.get(apiUrl)

  try {
    const filteredArticles = data.results.filter(article => {
      return (
        article.title &&
        article.abstract &&
        article.url &&
        article.multimedia?.[0]?.url &&
        article.created_date
      );
    });

    const news = filteredArticles.map(article => ({
      ...article,
      source: 'New York Times',
      author: 'New York Times',
      description: article.abstract,
      imageUrl: article.multimedia?.[0]?.url,
      createdDate: article.created_date
    }))

    dispatch({
      type: SET_NEWS_API_HEADLINE,
      payload: news
    })
    dispatch(fetchNewsApiHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsApiHeadlineFailure());
  }
};
