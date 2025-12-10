import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

// Connect to the backend socket
const ENDPOINT = 'http://localhost:5000'; 
let socket;

const ChatPage = () => {
  const { matchId } = useParams(); // Get ID from URL
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Ref to auto-scroll to bottom
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Initial Setup (Load History + Connect Socket)
  useEffect(() => {
    // A. Fetch Chat History
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${matchId}`);
        setMessages(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load chat");
      }
    };

    fetchMessages();

    // B. Socket Connection
    socket = io(ENDPOINT);
    socket.emit('join_chat', matchId); // Tell backend we are in this room

    // C. Listen for incoming messages
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup on unmount (leave chat)
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [matchId]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // 1. Save to Backend (which also emits the socket event)
      const { data } = await api.post('/messages', {
        matchId,
        content: newMessage
      });

      // 2. Add to UI immediately (Optional, but socket usually handles this)
      // We rely on the socket 'receive_message' event to append it to avoid duplicates
      // But clearing input is needed:
      setNewMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading Chat...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-100 max-w-4xl mx-auto border shadow-xl rounded-lg overflow-hidden my-4">
      
      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-blue-600">
            &larr; Back
          </button>
          <h2 className="font-bold text-lg text-gray-800">Live Chat</h2>
        </div>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Secure Connection</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5ddd5]">
        {messages.map((msg, index) => {
          const isMyMessage = msg.senderId === user._id;
          return (
            <div 
              key={index} 
              className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] px-4 py-2 rounded-lg shadow-md text-sm ${
                  isMyMessage 
                    ? 'bg-green-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
                <span className={`text-[10px] block text-right mt-1 ${isMyMessage ? 'text-green-100' : 'text-gray-400'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="bg-white p-4 border-t flex gap-2">
        <input 
          type="text" 
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-green-500 bg-gray-50"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-green-600 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center hover:bg-green-700 transition"
        >
          <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatPage;