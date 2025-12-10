import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import HelperCard from '../components/dashboard/HelperCard';
import RequestCard from '../components/dashboard/RequestCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]); // Stores helpers or requests
  const [loading, setLoading] = useState(true);

  // Fetch data when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'receiver') {
          // If receiver, fetch list of helpers
          const res = await api.get('/users/helpers');
          setData(res.data);
        } else {
          // If helper, fetch my requests
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

  const handleRequestClick = (helper) => {
    // We will build the "Create Request" modal next!
    alert(`You clicked ${helper.name}. Form coming soon!`);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await api.put(`/requests/${requestId}/accept`);
      alert("Request Accepted! Chat opened.");
      // Refresh list to show updated status
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
        // RECEIVER VIEW: Grid of Helper Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? (
            data.map(helper => (
              <HelperCard key={helper._id} helper={helper} onRequestClick={handleRequestClick} />
            ))
          ) : (
            <p>No helpers found.</p>
          )}
        </div>
      ) : (
        // HELPER VIEW: List of Request Cards
        <div className="max-w-3xl">
          {data.length > 0 ? (
            data.map(req => (
              <RequestCard key={req._id} request={req} onAccept={handleAcceptRequest} />
            ))
          ) : (
            <p className="text-gray-500">No requests yet. Wait for someone to find you!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;