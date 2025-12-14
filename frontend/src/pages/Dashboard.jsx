import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, Loader2, Sparkles, LayoutList, Users, 
  Clock, CheckCircle2, XCircle, MessageCircle, X, Power, UserCheck, 
  ArrowRight, Shield, Zap 
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import HelperCard from '../components/dashboard/HelperCard';
import CreateRequestModal from '../components/dashboard/CreateRequestModal';

const Dashboard = () => {
  const { user, login } = useContext(AuthContext); 
  const navigate = useNavigate();
  
  const [data, setData] = useState([]); 
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Tabs State
  const [activeTab, setActiveTab] = useState('helpers'); // Receiver
  const [helperTab, setHelperTab] = useState('pending'); // Helper

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'receiver') {
          const helpersRes = await api.get('/users/helpers');
          setData(helpersRes.data);
          const requestsRes = await api.get('/requests/my-requests');
          setMyRequests(requestsRes.data);
        } else {
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

  // --- HELPER TOGGLE ---
  const toggleAvailability = async () => {
    try {
      const newStatus = !user.helperProfile?.isAvailable;
      await api.put('/users/profile', { isAvailable: newStatus });
      const updatedUser = { 
        ...user, 
        helperProfile: { ...user.helperProfile, isAvailable: newStatus } 
      };
      login(updatedUser, localStorage.getItem('token'));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // --- FILTERS ---
  const filteredHelpers = data.filter(helper => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      helper.name.toLowerCase().includes(lowerQuery) ||
      helper.helperProfile?.skills?.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
  });

  const pendingRequests = data.filter(req => req.status === 'pending');
  const activeConnections = data.filter(req => req.status === 'accepted');

  // --- HANDLERS ---
  const handleRequestClick = (helper) => {
    setSelectedHelper(helper); 
    setIsModalOpen(true);      
  };

  const handleCancelRequest = async (requestId, e) => {
    e.stopPropagation();
    if (!window.confirm("Cancel this request?")) return;
    try {
      await api.delete(`/requests/${requestId}`);
      setMyRequests(prev => prev.filter(req => req._id !== requestId));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await api.put(`/requests/${requestId}/accept`);
      alert("Accepted! Chat is now open.");
      window.location.reload(); 
    } catch (err) {
      alert("Failed to accept");
    }
  };

  const handleDeclineRequest = async (requestId) => {
    if(!window.confirm("Decline this request?")) return;
    try {
      await api.put(`/requests/${requestId}/decline`);
      window.location.reload(); 
    } catch (err) {
      alert("Failed to decline");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
      declined: "bg-red-100 text-red-700 border-red-200",
      pending: "bg-amber-100 text-amber-700 border-amber-200"
    };
    const icons = {
      accepted: <CheckCircle2 size={14} />,
      declined: <XCircle size={14} />,
      pending: <Clock size={14} />
    };
    return (
      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.pending}`}>
        {icons[status] || icons.pending} <span className="capitalize">{status}</span>
      </span>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#ebf2fa]">
      <Loader2 className="animate-spin text-[#747def]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ebf2fa] font-sans pt-28 pb-12 px-6">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#181E4B] mb-3" style={{ fontFamily: "'Vollkorn', serif" }}>
              Dashboard
            </h1>
            <p className="text-[#5E6282] text-lg font-medium">
              {user.role === 'receiver' 
                ? 'Find the perfect help for your needs.' 
                : 'Manage your requests and active chats.'}
            </p>
          </div>

          {/* HELPER STATUS SWITCH */}
          {user.role === 'helper' && (
            <div className="bg-white p-1.5 rounded-full border border-gray-200 shadow-sm flex items-center">
               <button 
                 onClick={toggleAvailability}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
                   user.helperProfile?.isAvailable 
                     ? 'bg-green-100 text-green-700 shadow-inner' 
                     : 'hover:bg-gray-50 text-gray-500'
                 }`}
               >
                 <div className={`w-2.5 h-2.5 rounded-full ${user.helperProfile?.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                 Online
               </button>
               <button 
                 onClick={toggleAvailability}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
                   !user.helperProfile?.isAvailable 
                     ? 'bg-gray-800 text-white shadow-lg' 
                     : 'hover:bg-gray-50 text-gray-500'
                 }`}
               >
                 <Power size={16} /> Busy
               </button>
            </div>
          )}
        </div>

        {/* --- RECEIVER VIEW --- */}
        {user.role === 'receiver' ? (
          <div>
            {/* TABS */}
            <div className="flex gap-8 mb-8 border-b-2 border-gray-100">
              <button 
                onClick={() => setActiveTab('helpers')}
                className={`pb-4 px-2 flex items-center gap-2 font-bold text-lg transition-all border-b-[3px] -mb-[2px] ${
                  activeTab === 'helpers' ? 'border-[#747def] text-[#181E4B]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <Users size={20} /> Find Helpers
              </button>
              <button 
                onClick={() => setActiveTab('requests')}
                className={`pb-4 px-2 flex items-center gap-2 font-bold text-lg transition-all border-b-[3px] -mb-[2px] ${
                  activeTab === 'requests' ? 'border-[#747def] text-[#181E4B]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <LayoutList size={20} /> My Requests
                {myRequests.length > 0 && <span className="bg-[#F4616D] text-white text-[10px] px-1.5 py-0.5 rounded-full">{myRequests.length}</span>}
              </button>
            </div>

            {/* HELPERS GRID */}
            {activeTab === 'helpers' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-end mb-6">
                  <div className="flex items-center bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm w-full md:w-auto focus-within:border-[#747def] focus-within:ring-4 focus-within:ring-[#747def]/10 transition-all">
                    <Search size={18} className="text-gray-400 mr-3" />
                    <input 
                      placeholder="Search skills (e.g. Math, React)..." 
                      className="outline-none text-sm text-[#181E4B] placeholder-gray-400 w-full md:w-64" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredHelpers.length > 0 ? (
                    filteredHelpers.map(helper => (
                      <HelperCard key={helper._id} helper={helper} onRequestClick={handleRequestClick} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <div className="inline-block p-4 rounded-full bg-white mb-4 shadow-sm"><Search size={32} className="text-gray-300"/></div>
                      <p className="text-gray-500 font-medium">No helpers found matching "{searchQuery}".</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REQUESTS LIST */}
            {activeTab === 'requests' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {myRequests.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRequests.map((req) => (
                      <div key={req._id} className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 relative group overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${req.status === 'accepted' ? 'bg-emerald-500' : req.status === 'declined' ? 'bg-red-400' : 'bg-amber-400'}`}></div>
                        
                        <button onClick={(e) => handleCancelRequest(req._id, e)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"><X size={18} /></button>

                        <div className="flex items-center gap-4 mb-4 pl-3">
                          <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 shadow-inner">
                             {req.helperId?.profileImage ? <img src={req.helperId.profileImage} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center font-bold text-[#747def]">{req.helperId?.name?.[0]}</div>}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Request to</p>
                            <h3 className="text-lg font-bold text-[#181E4B] leading-tight">{req.helperId?.name}</h3>
                          </div>
                        </div>

                        <div className="pl-3 mb-6">
                          <div className="bg-[#f8f9fc] p-4 rounded-xl border border-gray-100/50 mb-3">
                             <p className="font-bold text-[#181E4B] text-sm mb-1">{req.reason}</p>
                             <p className="text-xs text-gray-500 line-clamp-2">{req.details}</p>
                          </div>
                          <div className="flex justify-between items-center">
                             {getStatusBadge(req.status)}
                             <span className="text-[10px] text-gray-400 font-medium">{new Date(req.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {req.status === 'accepted' && (
                          <button onClick={() => navigate(`/chat/${req.matchId}`)} className="w-full py-3 bg-[#181E4B] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#747def] transition-colors shadow-lg shadow-blue-900/10">
                            <MessageCircle size={18} /> Open Chat
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <LayoutList size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700">No active requests</h3>
                    <button onClick={() => setActiveTab('helpers')} className="mt-4 text-[#747def] font-bold hover:underline">Browse Helpers</button>
                  </div>
                )}
              </div>
            )}

            {isModalOpen && selectedHelper && (
              <CreateRequestModal helper={selectedHelper} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
          </div>
        ) : (
          
          /* --- HELPER VIEW (PREMIUM REDESIGN) --- */
          <div className="max-w-5xl mx-auto">
             
             {/* 1. Control Bar */}
             <div className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-gray-100 flex justify-between items-center mb-8 sticky top-24 z-10">
               <div className="flex gap-1 bg-[#f0f2f5] p-1 rounded-[1.2rem]">
                 {['pending', 'active'].map((tab) => (
                   <button 
                    key={tab}
                    onClick={() => setHelperTab(tab)}
                    className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                      helperTab === tab 
                        ? 'bg-white text-[#181E4B] shadow-md shadow-gray-200' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                   >
                     {tab === 'pending' ? <Sparkles size={16} className={helperTab===tab ? "text-[#F4616D]" : ""}/> : <UserCheck size={16} className={helperTab===tab ? "text-[#747def]" : ""}/>}
                     {tab === 'pending' ? 'New Requests' : 'Active Chats'}
                     {tab === 'pending' && pendingRequests.length > 0 && <span className="bg-[#F4616D] text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingRequests.length}</span>}
                   </button>
                 ))}
               </div>
               <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 px-4">
                  <Shield size={14} /> Secure Connection
               </div>
             </div>

             {/* 2. Content Area */}
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* --- TAB: NEW REQUESTS --- */}
                {helperTab === 'pending' && (
                  <div className="space-y-6">
                    {pendingRequests.length > 0 ? (
                      pendingRequests.map(req => (
                        <div key={req._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 items-start md:items-center group">
                           {/* Avatar */}
                           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-xl font-bold text-[#747def] flex-shrink-0 border border-white shadow-sm">
                              {req.receiverId?.name?.[0]}
                           </div>
                           
                           {/* Details */}
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-[#181E4B]">{req.receiverId?.name}</h3>
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider">{req.reason}</span>
                              </div>
                              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                                "{req.details}"
                              </p>
                              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 font-medium">
                                 <Clock size={12} /> Received {new Date(req.createdAt).toLocaleDateString()}
                              </div>
                           </div>

                           {/* Actions */}
                           <div className="flex gap-3 w-full md:w-auto">
                              <button onClick={() => handleDeclineRequest(req._id)} className="flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors border border-gray-200 hover:border-red-100">
                                Decline
                              </button>
                              <button onClick={() => handleAcceptRequest(req._id)} className="flex-1 md:flex-none px-8 py-3 bg-[#181E4B] hover:bg-[#747def] text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                                Accept <ArrowRight size={16} />
                              </button>
                           </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-24">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-gray-300">
                          <Zap size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#181E4B]">All caught up!</h3>
                        <p className="text-gray-500 mt-2">You have no pending requests right now.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* --- TAB: ACTIVE CHATS --- */}
                {helperTab === 'active' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {activeConnections.length > 0 ? (
                       activeConnections.map(req => (
                         <div 
                           key={req._id} 
                           onClick={() => navigate(`/chat/${req.matchId}`)} 
                           className="bg-white p-5 rounded-[2rem] border border-gray-100 hover:border-[#747def]/30 hover:shadow-xl transition-all cursor-pointer group flex items-center gap-5"
                         >
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                                {req.receiverId?.profileImage ? (
                                  <img src={req.receiverId.profileImage} className="w-full h-full object-cover"/>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center font-bold text-[#747def] text-xl">{req.receiverId?.name?.[0]}</div>
                                )}
                              </div>
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-[#181E4B] text-lg truncate">{req.receiverId?.name}</h3>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Helping with: {req.reason}</p>
                              <div className="flex items-center gap-1 text-sm text-[#747def] font-medium group-hover:underline">
                                <MessageCircle size={14} /> Open Chat
                              </div>
                            </div>
                            
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#747def] group-hover:text-white transition-colors">
                               <ArrowRight size={20} />
                            </div>
                         </div>
                       ))
                    ) : (
                      <div className="col-span-full text-center py-24">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                          <MessageCircle size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">No active chats</h3>
                        <p className="text-gray-500 mt-2">Requests you accept will appear here.</p>
                      </div>
                    )}
                  </div>
                )}

             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;