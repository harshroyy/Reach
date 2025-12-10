import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import this
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import HelperCard from '../components/dashboard/HelperCard';
import RequestCard from '../components/dashboard/RequestCard';
import CreateRequestModal from '../components/dashboard/CreateRequestModal'; // <--- IMPORT THIS

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [myRequests, setMyRequests] = useState([]); // New State for Receiver's own requests

  // New State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);

  const navigate = useNavigate(); // Initialize hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'receiver') {
          // 1. Fetch Helpers to hire
          const helpersRes = await api.get('/users/helpers');
          setData(helpersRes.data);

          // 2. Fetch My Sent Requests (To check for matches)
          const requestsRes = await api.get('/requests/my-requests');
          setMyRequests(requestsRes.data);

        } else {
          // Helper Logic
          const res = await api.get('/requests/my-requests');
          setData(res.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.role]);

  // Handle clicking "Ask for Help"
  const handleRequestClick = (helper) => {
    setSelectedHelper(helper); // Save the specific helper
    setIsModalOpen(true);      // Open the popup
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await api.put(`/requests/${requestId}/accept`);
      alert("Request Accepted! Chat opened.");
      window.location.reload(); 
    } catch (err) {
      alert("Failed to accept request");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {user.role === 'receiver' ? 'Find a Helper' : 'Your Help Requests'}
        </h1>
        <p className="text-gray-600 mt-2">
          {user.role === 'receiver' 
            ? 'Browse our community of helpers willing to support you.' 
            : 'Manage incoming requests and connect with people.'}
        </p>
      </div>

      {user.role === 'receiver' ? (
        <>
          {/* SECTION 1: MY ACTIVE REQUESTS */}
          {myRequests.length > 0 && (
            <div className="mb-10 bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Requests & Matches</h2>
              <div className="space-y-4">
                {myRequests.map((req) => (
                  <div key={req._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                        req.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {req.status}
                      </span>
                      <p className="font-semibold text-gray-800 mt-1">{req.reason}</p>
                      <p className="text-sm text-gray-500">To: {req.helperId?.name}</p>
                    </div>
                    {/* If Accepted, show CHAT button */}
                    {req.status === 'accepted' && (
                      <button 
                        onClick={() => navigate(`/chat/${req.matchId}`)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold shadow-md flex items-center gap-2"
                      >
                        💬 Open Chat
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: FIND A HELPER */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Helpers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map(helper => (
                <HelperCard key={helper._id} helper={helper} onRequestClick={handleRequestClick} />
              ))
            ) : (
              <p>No helpers found.</p>
            )}
          </div>
          
          {/* RENDER MODAL ONLY IF OPEN */}
          {isModalOpen && selectedHelper && (
            <CreateRequestModal 
              helper={selectedHelper} 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />
          )}
        </>
      ) : (
        <div className="max-w-3xl">
          {data.map(req => (
            <RequestCard 
              key={req._id} 
              request={req} 
              onAccept={handleAcceptRequest}
              onChatClick={() => navigate(`/chat/${req.matchId}`)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;