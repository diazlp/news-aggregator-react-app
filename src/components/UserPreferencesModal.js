import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Utils from '../utils';
import { deleteUserPreferredSources, postUserPreferredSources } from '../actions/userPreferences';

const UserPreferencesModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()

  const previousSelectedCategoriesRef = useRef([]);
  const previousSelectedAuthorsRef = useRef([]);
  const previousSelectedSourcesRef = useRef([]);

  const { user_id } = useSelector((state) => state.user)
  const { categories, authors } = useSelector((state) => state.news);
  const { preferredCategories, preferredAuthors, preferredSources } = useSelector((state) => state.userPreferences)

  const [selectedCategories, setSelectedCategories] = useState(preferredCategories);
  const [selectedAuthors, setSelectedAuthors] = useState(preferredAuthors);
  const [selectedSources, setSelectedSources] = useState(preferredSources);

  useEffect(() => {
    if (preferredCategories.length) {
      setSelectedCategories(preferredCategories)
    }
    if (selectedAuthors.length) {
      setSelectedAuthors(selectedAuthors)
    }
    if (preferredSources.length) {
      setSelectedSources(preferredSources)
    }
  },
    [preferredCategories, preferredAuthors, preferredSources]
  )

  useEffect(() => {
    previousSelectedCategoriesRef.current = selectedCategories;
    previousSelectedAuthorsRef.current = selectedAuthors;
    previousSelectedSourcesRef.current = selectedSources;
  });

  const handleCategoryChange = (selectedOptions) => {
    const previousSelectedCategories = previousSelectedCategoriesRef.current;
    const selectedValues = selectedOptions.map((option) => option.value);

    const deletedCategories = previousSelectedCategories.filter(
      (category) => !selectedValues.includes(category.value)
    );

    const addedCategories = selectedOptions.filter(
      (option) => !previousSelectedCategories.find((category) => category.value === option.value)
    );

    setSelectedCategories(selectedOptions);

    console.log('Deleted categories:', deletedCategories);
    console.log('Added categories:', addedCategories);
  };

  const handleAuthorChange = (selectedOptions) => {
    const previousSelectedAuthors = previousSelectedAuthorsRef.current;
    const selectedValues = selectedOptions.map((option) => option.value);

    const deletedAuthors = previousSelectedAuthors.filter(
      (author) => !selectedValues.includes(author.value)
    );

    const addedAuthors = selectedOptions.filter(
      (option) => !previousSelectedAuthors.find((author) => author.value === option.value)
    );

    setSelectedAuthors(selectedOptions);

    console.log('Deleted authors:', deletedAuthors);
    console.log('Added authors:', addedAuthors);
  };

  const onSourceChange = (selectedOptions) => {
    const previousSelectedSources = previousSelectedSourcesRef.current;
    const selectedValues = selectedOptions.map((option) => option.value);

    const deletedSources = previousSelectedSources.filter(
      (source) => !selectedValues.includes(source.value)
    );

    const addedSources = selectedOptions.filter(
      (option) => !previousSelectedSources.find((source) => source.value === option.value)
    );

    setSelectedSources(selectedOptions);

    if (addedSources.length) {
      dispatch(postUserPreferredSources({
        user_id,
        value: addedSources[0].value,
        label: addedSources[0].label
      }))
    } else if (deletedSources.length) {
      dispatch(deleteUserPreferredSources({
        user_id,
        value: deletedSources[0].value
      }))
    }
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
                  isClearable={false}
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
                  isClearable={false}
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
                  isClearable={false}
                  isMulti
                  onChange={onSourceChange}
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
