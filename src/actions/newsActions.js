import axios from "axios";
import {
  SET_NEWS_API_HEADLINE,
  SET_NEWS_API_HEADLINE_SUCCESS,
  SET_NEWS_API_HEADLINE_FAILURE,
  SET_NEWS_CATEGORIES_HEADLINE,
  SET_FILTERED_NEWS_API,
  UNMOUNT_FILTERED_NEWS_API
} from './actionTypes'

// Action Creators
export const fetchNewsApiHeadlineSuccess = () => ({
  type: SET_NEWS_API_HEADLINE_SUCCESS,
});

export const fetchNewsApiHeadlineFailure = () => ({
  type: SET_NEWS_API_HEADLINE_FAILURE,
});

export const unmountFilteredNews = () => ({
  type: UNMOUNT_FILTERED_NEWS_API
})

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

export const fetchTheGuardianApiHeadline = () => async (dispatch, state) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/guardian-home';

  const { data } = await axios.get(apiUrl)
  const { categories: stateCategories } = state().news

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

    let categories = news.map(({ sectionId }) => ({
      value: sectionId,
      label: sectionId.trim().charAt(0).toUpperCase() + sectionId.slice(1)
    }))

    categories = [...categories, ...stateCategories].filter((obj, index, self) =>
      index === self.findIndex((item) => item.value === obj.value)
    );

    dispatch({
      type: SET_NEWS_API_HEADLINE,
      payload: news
    })
    dispatch({
      type: SET_NEWS_CATEGORIES_HEADLINE,
      payload: categories
    })
    dispatch(fetchNewsApiHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsApiHeadlineFailure());
  }
};

export const fetchNewYorkTimesApiHeadline = () => async (dispatch, state) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL + '/nyt-home';

  const { data } = await axios.get(apiUrl)
  const { categories: stateCategories } = state().news

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

    let categories = news.map(({ section }) => ({
      value: section,
      label: section.trim().charAt(0).toUpperCase() + section.slice(1)
    }))

    categories = [...categories, ...stateCategories].filter((obj, index, self) =>
      index === self.findIndex((item) => item.value === obj.value)
    );

    dispatch({
      type: SET_NEWS_API_HEADLINE,
      payload: news
    })
    dispatch({
      type: SET_NEWS_CATEGORIES_HEADLINE,
      payload: categories
    })
    dispatch(fetchNewsApiHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsApiHeadlineFailure());
  }
};

export const fetchFilteredNewsApi = (payload) => async (dispatch) => {
  const d = new Date();
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = d.getDate().toString().padStart(2, '0');
  const monthAgoDate = `${year}-${month - 1}-${day}`;
  const todaysDate = `${year}-${month}-${day}`;

  const apiUrl = process.env.REACT_APP_API_BASE_URL + `/news-api-filter?q=${payload.keyword}&from=${payload.dateFrom || monthAgoDate}&to=${payload.dateTo || todaysDate}&sortBy=popularity`;

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
      title: article.title.split('-').length > 1 ? article.title.split('-').slice(0, -1).join('').trim() : article.title,
      source: article.source.name,
      imageUrl: article.urlToImage,
      createdDate: article.publishedAt,
    }))

    dispatch({
      type: SET_FILTERED_NEWS_API,
      payload: news.slice(0, 10)
    })
    dispatch(fetchNewsApiHeadlineSuccess());
  } catch (err) {
    dispatch(fetchNewsApiHeadlineFailure());
  }
}