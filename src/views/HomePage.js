import HeaderNav from "../components/HeaderNav";
import NewsCard from "../components/NewsCard"
import FilterInputComponent from "../components/FilterInputComponent";

const HomePage = () => {
  return (
    <>
      <HeaderNav />
      <FilterInputComponent />
      <NewsCard />
    </>
  );
}

export default HomePage