import React from 'react'

const NewsCard = ({ data }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="card flex flex-col shadow-box shadow-xl">
            <div className="rounded-t-lg overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
            </div>
            <div className="card-content flex-grow p-6 flex flex-col justify-between gap-7 rounded-b-lg bg-white">
              <div className="text-justify mb-auto">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="text-left">
                <p className="text-gray-500">
                  Source: <span className="font-semibold">{item.source}</span>
                </p>
                <p className="text-gray-500">
                  Author: <span className="font-semibold">{item.author}</span>
                </p>
                <p className="text-gray-500">
                  Created Date: <span className="font-semibold">{item.createdDate}</span>
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