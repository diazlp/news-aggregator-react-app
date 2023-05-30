import { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Utils from '../utils';

const UserPreferencesModal = ({ isOpen, onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  const { categories, authors } = useSelector((state) => state.news);

  const authorsOptions = [
    { value: 'john', label: 'John' },
    { value: 'emma', label: 'Emma' },
    { value: 'alex', label: 'Alex' },
    { value: 'sara', label: 'Sara' },
    { value: 'michael', label: 'Michael' },
  ];

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleAuthorChange = (selectedOptions) => {
    setSelectedAuthors(selectedOptions);
  };

  const handleSourceChange = (selectedOptions) => {
    setSelectedSources(selectedOptions);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal modal-open">
        <div className="modal-box">
          <div className="modal-content">
            <div className="modal-header flex justify-between items-center mb-8">
              <div></div>
              <h3 className="modal-title text-end font-bold text-2xl">User Preferences</h3>
              <button className="modal-close" onClick={onClose}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-6">
                <label htmlFor="categories" className="block font-medium mb-1">
                  Categories
                </label>
                <Select
                  id="categories"
                  placeholder="Select by Categories..."
                  options={categories}
                  value={selectedCategories}
                  isMulti
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="authors" className="block font-medium mb-1">
                  Authors
                </label>
                <Select
                  id="authors"
                  placeholder="Select by Authors..."
                  options={authors}
                  value={selectedAuthors}
                  isMulti
                  onChange={handleAuthorChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="sources" className="block font-medium mb-1">
                  Sources
                </label>
                <Select
                  id="sources"
                  placeholder="Select by Sources..."
                  options={Utils.sourceFilterOptions()}
                  value={selectedSources}
                  isMulti
                  onChange={handleSourceChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesModal;
