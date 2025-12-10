import React from 'react';

const RequestCard = ({ request, onAccept }) => {
  const isPending = request.status === 'pending';

  return (
    <div className="bg-white rounded-lg shadow border-l-4 border-blue-500 p-5 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold text-gray-800">{request.category} Help</h4>
          <p className="text-sm text-gray-500">From: {request.receiverId?.name} ({request.receiverId?.city})</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold 
          ${isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {request.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-3 bg-gray-50 p-3 rounded text-gray-700 text-sm">
        <p><strong>Reason:</strong> {request.reason}</p>
        <p className="mt-1"><strong>Details:</strong> {request.details}</p>
      </div>

      {isPending && (
        <div className="mt-4 flex gap-3">
          <button 
            onClick={() => onAccept(request._id)}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 text-sm font-medium"
          >
            Accept Request
          </button>
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 text-sm font-medium">
            Decline
          </button>
        </div>
      )}
      
      {request.status === 'accepted' && (
        <button 
          onClick={() => window.location.href = `/chat/${request.matchId}`} // Link to chat
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold shadow"
        >
          Open Chat
        </button>
      )}
    </div>
  );
};

export default RequestCard;