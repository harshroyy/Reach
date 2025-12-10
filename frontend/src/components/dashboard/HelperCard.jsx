import React from 'react';

const HelperCard = ({ helper, onRequestClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {helper.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{helper.name}</h3>
            <p className="text-sm text-gray-500">{helper.city}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600 text-sm line-clamp-2">
            {helper.bio || "This helper hasn't written a bio yet, but they are ready to help!"}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {helper.helperProfile?.skills?.map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-100">
              {skill}
            </span>
          ))}
        </div>

        <button 
          onClick={() => onRequestClick(helper)}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ask for Help
        </button>
      </div>
    </div>
  );
};

export default HelperCard;