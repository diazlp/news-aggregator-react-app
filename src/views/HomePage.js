import HeaderNav from "../components/HeaderNav";
import NewsCard from "../components/NewsCard"
import FilterInputComponent from "../components/FilterInputComponent";

const HomePage = () => {
  const onSearch = () => {

  }

  const onFilter = () => {

  }

  return (
    <>
      <HeaderNav />
      <FilterInputComponent onSearch={onSearch} onFilter={onFilter} />
      <NewsCard />
    </>
  );
}

export default HomePage