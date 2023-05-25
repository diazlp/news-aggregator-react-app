import { useEffect } from "react"
import { fetchNewsApiHeadline } from "../actions/newsActions"
import { useDispatch } from "react-redux"
import NewsCard from "../components/NewsCard"

const HomePage = () => {
  const dispatch = useDispatch()

  const dummyData = [
    {
      id: 1,
      imageUrl: 'https://image.cnbcfm.com/api/v1/image/107059109-16522234842022-05-10t210020z_1347919779_rc2mfs9x41c5_rtrmadp_0_health-coronavirus-treatments-pfizer.jpeg?v=1685024666&w=1920&h=1080  ',
      title: 'FDA grants full approval to Pfizer Covid treatment Paxlovid for high-risk adults',
      description: 'Pfizer and the FDA view Paxlovid as an important complementary tool to vaccination that can help high-risk Americans manage their Covid infections.',
      source: 'CNBC',
      author: 'Annika Kim Constantino',
      createdDate: new Date('2023-05-25T14:24:26Z').toLocaleDateString()
    },
    {
      id: 2,
      imageUrl: 'https://images.wsj.net/im-785590/social',
      title: 'Stock Market Today: Nasdaq Rises as Nvidia Stock Jumps; Dow Slides 100 Points',
      description: 'Live coverage of stocks and financial news, including the S&P 500, Dow and Nasdaq Composite.',
      source: 'The Wall Street Journal',
      author: 'Josh Mitchell',
      createdDate: new Date('2023-05-25T14:24:26Z').toLocaleDateString()
    },
    {
      id: 3,
      imageUrl: 'https://nypost.com/wp-content/uploads/sites/2/2023/05/newspress-collage-27191413-1684957974055.jpg?quality=75&strip=all&1684943766&w=1024',
      title: 'Target loses $9B in week following boycott calls over LGBTQ-friendly kids clothing',
      description: 'Since the controversy erupted a week ago, Target’s stock has fallen by some 11% while its market capitalization has shrunk by some $6.4 billion.',
      source: 'New York Post',
      author: 'Ariel Zilber',
      createdDate: new Date('2023-05-25T14:24:26Z').toLocaleDateString()
    },
    {
      id: 4,
      imageUrl: 'https://image.cnbcfm.com/api/v1/image/107110962-16618076592021-11-22t231947z_2146396288_rc2xzq9qkd7e_rtrmadp_0_best-buy-results.jpeg?v=1685013365&w=1920&h=1080',
      title: 'Dollar Tree shares plunge after company misses on earnings, slashes full-year profit outlook',
      description: 'Dollar Tree disappointed Wall Street Thursday after it reduced its profit outlook for the year and missed on earnings estimates, sending shares plunging.',
      source: 'CNBC',
      author: 'Gabrielle Fonrouge',
      createdDate: new Date('2023-05-25T14:24:26Z').toLocaleDateString()
    },
    {
      id: 5,
      imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/230524152300-01-us-first-quarter-gdp-2023-restricted.jpg?c=16x9&q=w_800,c_fill',
      title: 'The US economy grew faster in the first quarter than previously reported',
      description: 'US economic growth in the first three months of the year was faster than previously estimated, the Commerce Department reported on Thursday.',
      source: 'CNN',
      author: 'Bryan Mena',
      createdDate: new Date('2023-05-25T14:24:26Z').toLocaleDateString()
    },
    {
      id: 6,
      imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/230420174349-capitol-dome-041723.jpg?c=16x9&q=w_800,c_fill',
      title: 'Snowflake Stock Plunges On Weak Outlook Amid Slower Cloud Computing Growth',
      description: 'Snowflake Stock Plunges On Weak Outlook Amid Slower Cloud Computing Growth.',
      source: 'Investor\'\s Business Daily',
      author: 'Investor\'\s Business Daily',
      createdDate: new Date('2023-05-25T14:24:26Z').toLocaleDateString()
    },
  ];

  useEffect(() => {
    // dispatch(fetchNewsApiHeadline())
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-8">Card List</h1>
      <NewsCard data={dummyData} />
    </div>
  );
}

export default HomePage