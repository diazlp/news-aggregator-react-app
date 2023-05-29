import React from 'react'

const HeaderNav = () => {
  return (
    <header className="bg-bone-white text-black py-4 mb-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="select-none text-xl font-semibold">
          News Aggregator
        </div>
        <button className="select-none py-2 px-4 transition duration-300 hover:underline font-semibold">
          Sign In
        </button>
      </div>
    </header>
  )
}

export default HeaderNav