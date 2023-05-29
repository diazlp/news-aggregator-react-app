import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchFilteredNewsApi, unmountFilteredNews } from '../actions/newsActions';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const dispatch = useDispatch()

  const { categories, isSearchedNews } = useSelector((state) => state.news)

  // Calculate the maximum and minimum dates allowed
  const today = new Date();
  const maxDate = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() - 30);

  const [keyword, setKeyword] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSource, setFilterSource] = useState('');

  const sourceOptions = [
    { value: 'bbc', label: 'BBC' },
    { value: 'cnn', label: 'CNN' },
    { value: 'nytimes', label: 'The New York Times' },
    // Add more options as needed
  ];

  useEffect(() => {
    let timer;
    if (keyword) {
      timer = setTimeout(() => {
        dispatch(fetchFilteredNewsApi({
          keyword
        }))
      }, 500);
    } else {
      dispatch(unmountFilteredNews())
    }

    return () => {
      clearTimeout(timer);
    };
  }, [keyword, onSearch]);

  const handleFilter = () => {
    const filters = {
      date: filterDate ? filterDate.toISOString() : '',
      category: filterCategory,
      source: filterSource,
    };
    onFilter(filters);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-4 w-full">
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by keyword..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 w-full"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
      </div>
      {isSearchedNews && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <DatePicker
              selected={filterDate}
              onChange={(date) => setFilterDate(date)}
              placeholderText="Filter by Date"
              className="mt-4 w-full rounded-sm"
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
          <div className="col-span-1">
            <Select
              value={filterCategory}
              onChange={(selectedOption) => setFilterCategory(selectedOption)}
              options={categories}
              placeholder="Filter by Category"
              className="mt-4 w-full"
            />
          </div>
          <div className="col-span-1">
            <Select
              value={filterSource}
              onChange={(selectedOption) => setFilterSource(selectedOption)}
              options={sourceOptions}
              placeholder="Filter by Source"
              className="mt-4 w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
