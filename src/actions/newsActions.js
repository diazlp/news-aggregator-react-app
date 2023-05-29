import axios from "axios";
import {
  SET_NEWS_HEADLINE,
  SET_NEWS_HEADLINE_SUCCESS,
  SET_NEWS_HEADLINE_FAILURE,
  SET_NEWS_CATEGORIES_HEADLINE,
  SET_FILTERED_NEWS,
  SET_FILTERED_NEWS_SUCCESS,
  SET_FILTERED_NEWS_FAILURE,
  UNMOUNT_FILTERED_NEWS
} from "../actions/actionTypes";
import Utils from "../utils";

// Action Creators
export const fetchNewsHeadlineSuccess = () => ({
  type: SET_NEWS_HEADLINE_SUCCESS,
});

export const fetchNewsHeadlineFailure = () => ({
  type: SET_NEWS_HEADLINE_FAILURE,
});

export const fetchFilteredNewsSuccess = () => ({
  type: SET_FILTERED_NEWS_SUCCESS,
});

export const fetchFilteredNewsFailure = () => ({
  type: SET_FILTERED_NEWS_FAILURE,
});

export const unmountFilteredNews = () => ({
  type: UNMOUNT_FILTERED_NEWS
})

// Thunk Action Creator
export const fetchNewsApiHeadline = () => async (dispatch) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/news-api-headline?country=us';

  try {
    const { data } = await axios.get(apiUrl)

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
      type: SET_NEWS_HEADLINE,
      payload: news
    })
    dispatch(fetchNewsHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsHeadlineFailure());
  }
};

export const fetchTheGuardianApiHeadline = () => async (dispatch, state) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/guardian-home';

  try {
    const { data } = await axios.get(apiUrl)

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

    let categories = news.map(({ sectionId }) => ({
      value: sectionId,
      label: sectionId.trim().charAt(0).toUpperCase() + sectionId.slice(1)
    }))

    categories = [...categories, ...state().news.categories].filter((obj, index, self) =>
      index === self.findIndex((item) => item.value === obj.value)
    );

    dispatch({
      type: SET_NEWS_HEADLINE,
      payload: news
    })
    dispatch({
      type: SET_NEWS_CATEGORIES_HEADLINE,
      payload: categories
    })
    dispatch(fetchNewsHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsHeadlineFailure());
  }
};

export const fetchNewYorkTimesApiHeadline = () => async (dispatch, state) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/nyt-home';

  try {
    const { data } = await axios.get(apiUrl)

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

    let categories = news.map(({ section }) => ({
      value: section,
      label: section.trim().charAt(0).toUpperCase() + section.slice(1)
    }))

    categories = [...categories, ...state().news.categories].filter((obj, index, self) =>
      index === self.findIndex((item) => item.value === obj.value)
    );

    dispatch({
      type: SET_NEWS_HEADLINE,
      payload: news
    })
    dispatch({
      type: SET_NEWS_CATEGORIES_HEADLINE,
      payload: categories
    })
    dispatch(fetchNewsHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsHeadlineFailure());
  }
};

export const fetchFilteredNewsApi = (payload) => async (dispatch, state) => {
  const { monthAgoDate, todaysDate } = Utils.getDefaultDate()
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/news-api-filter?q=${payload.keyword}&from=${payload.dateFrom || monthAgoDate}&to=${payload.dateTo || todaysDate}&sortBy=popularity`;

  try {

    const { data } = await axios.get(apiUrl)

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

    let news = filteredArticles.map(article => ({
      ...article,
      title: article.title.split('-').length > 1 ? article.title.split('-').slice(0, -1).join('').trim() : article.title,
      source: article.source.name,
      imageUrl: article.urlToImage,
      createdDate: article.publishedAt,
    })).slice(0, 20)

    news = [...news, ...state().news.filteredNews]

    dispatch({
      type: SET_FILTERED_NEWS,
      payload: news
    })
    dispatch(fetchFilteredNewsSuccess());
  } catch (err) {
    dispatch(fetchFilteredNewsFailure());
  }
}

export const fetchFilteredTheGuardianApi = (payload) => async (dispatch, state) => {
  const { monthAgoDate, todaysDate } = Utils.getDefaultDate()
  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/guardian-filter?q=${payload.keyword}&section=${payload.section || ""}&from-date=${payload.dateFrom || monthAgoDate}&to-date=${payload.dateTo || todaysDate}`;

  try {
    const { data } = await axios.get(apiUrl)

    const filteredArticles = data.response?.results.filter(article => {
      return (
        article.webTitle &&
        article.fields?.trailText &&
        article.webUrl &&
        article.fields?.thumbnail &&
        article.webPublicationDate
      );
    });

    let news = filteredArticles.map(article => ({
      ...article,
      title: article.webTitle,
      source: 'The Guardian',
      author: 'The Guardian',
      description: article.fields?.trailText,
      imageUrl: article.fields?.thumbnail,
      url: article.webUrl,
      createdDate: article.webPublicationDate,
    }))

    news = [...news, ...state().news.filteredNews]

    dispatch({
      type: SET_FILTERED_NEWS,
      payload: news
    })
    dispatch(fetchFilteredNewsSuccess());
  } catch (err) {
    dispatch(fetchFilteredNewsFailure());
  }
};