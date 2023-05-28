import NewsCard from "../components/NewsCard"

const HomePage = () => {
  return (
    <>
      <header className="bg-bone-white text-black py-4 mb-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a className=" text-xl font-semibold cursor-pointer">
            News Aggregator
          </a>
          <button className=" py-2 px-4 transition duration-300 hover:underline font-semibold">
            Sign In
          </button>
        </div>
      </header>
      <div>
        <NewsCard />
      </div>
    </>
  );
}

export default HomePage