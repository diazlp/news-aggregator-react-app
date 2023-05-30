import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPreferredSources } from "../actions/userPreferences";
import HeaderNav from "../components/HeaderNav";
import NewsCard from "../components/NewsCard"
import FilterInputComponent from "../components/FilterInputComponent";

const HomePage = () => {
  const dispatch = useDispatch()

  const { isUserLoggedIn, user_id } = useSelector((state) => state.user)

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchUserPreferredSources({ user_id }))
    }
  }, [isUserLoggedIn])

  return (
    <>
      <HeaderNav />
      <FilterInputComponent />
      <NewsCard />
    </>
  );
}

export default HomePage