import { useState, useEffect } from 'react'
import { fetchNewYorkTimesApiHeadline, fetchNewsApiHeadline, fetchTheGuardianApiHeadline } from "../actions/newsActions"
import { useDispatch, useSelector } from 'react-redux';

const NewsCard = () => {
  const [news, setNews] = useState([])

  const { headlines } = useSelector((state) => state.news)
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchNewsApiHeadline())
    dispatch(fetchTheGuardianApiHeadline())
    dispatch(fetchNewYorkTimesApiHeadline())
  }, [])

  useEffect(() => {
    if (headlines.length) {
      setNews(headlines)
    }
  }, [headlines])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news.map((item, index) => (
          <div key={index} className="card flex flex-col shadow-box shadow-xl select-none">
            <div className="rounded-t-lg overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
            </div>
            <div className="card-content flex-grow p-6 flex flex-col justify-between gap-7 rounded-b-lg bg-white">
              <div className="text-justify mb-auto">
                <h2 className="text-xl font-semibold mb-2 cursor-pointer link-primary link-hover" onClick={() => window.open(item.url)}>{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-500">
                  <span className="font-bold text-blue-600">{item.source}</span> - <span className="font-semibold">{item.author}</span>
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">{new Date(item.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard