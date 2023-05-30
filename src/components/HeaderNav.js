import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUserLogout } from '../actions/userAction';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import UserFormTooltip from './UserFormTooltip';

const HeaderNav = () => {
  const dispatch = useDispatch()
  const [showTooltip, setShowTooltip] = useState(false);

  const { isUserLoggedIn } = useSelector((state) => state.user)

  return (
    <header className="bg-bone-white text-black py-4 mb-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="select-none text-xl font-semibold">
          News Aggregator
        </div>
        <div className="relative">
          {
            isUserLoggedIn ? (
              <>
                <button
                  className="select-none py-2 px-4 transition duration-300 hover:underline font-semibold flex items-center"
                  onClick={() => dispatch(postUserLogout())}
                >
                  Logout <FaSignOutAlt className="ml-3" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="select-none py-2 px-4 transition duration-300 hover:underline font-semibold flex items-center"
                  onClick={() => setShowTooltip(!showTooltip)}
                >
                  Sign In <FaSignInAlt className="ml-3" />
                </button>
                {showTooltip && <UserFormTooltip />}
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
