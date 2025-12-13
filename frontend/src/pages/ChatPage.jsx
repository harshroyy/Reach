import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Send, ArrowLeft, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react'; // <--- IMPORT THIS
import api from '../services/api';
import AuthContext from '../context/AuthContext';

// Connect to backend
const ENDPOINT = 'http://localhost:5000'; 
let socket;

const ChatPage = () => {
  const { matchId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [receiver, setReceiver] = useState(null);
  
  // Emoji State
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const res = await api.get(`/messages/${matchId}`);
        setMessages(res.data);
        
        const otherUserMsg = res.data.find(m => {
          const sId = typeof m.senderId === 'object' ? m.senderId._id : m.senderId;
          return sId !== user._id;
        });
        
        if (otherUserMsg && typeof otherUserMsg.senderId === 'object') {
           setReceiver(otherUserMsg.senderId);
        } else {
           try {
             const matchRes = await api.get(`/matches/${matchId}`);
             const isHelper = matchRes.data.helperId._id === user._id;
             setReceiver(isHelper ? matchRes.data.receiverId : matchRes.data.helperId);
           } catch (e) {
             console.log("Waiting for data...");
           }
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchChatData();

    socket = io(ENDPOINT);
    socket.emit('join_chat', matchId);

    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [matchId, user._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await api.post('/messages', {
        matchId,
        content: newMessage
      });
      setNewMessage("");
      setShowEmojiPicker(false); // Close picker after sending
    } catch (err) {
      alert("Failed to send");
    }
  };

  // --- EMOJI HANDLER ---
  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#ebf2fa]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#747def]"></div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#e5ddd5] font-sans relative">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#ebf2fa] opacity-100 z-0"></div>

      {/* --- HEADER --- */}
      <div className="fixed top-0 w-full z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft size={22} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-100">
                {receiver?.profileImage ? (
                  <img src={receiver.profileImage} alt={receiver.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#181E4B] font-bold text-lg">
                    {receiver?.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold text-[#181E4B] text-base leading-none mb-0.5">{receiver?.name || "Chat"}</h2>
              <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[#5E6282]">
          <button className="p-2 hover:bg-gray-50 rounded-full"><Phone size={20} /></button>
          <button className="p-2 hover:bg-gray-50 rounded-full"><Video size={20} /></button>
          <button className="p-2 hover:bg-gray-50 rounded-full"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* --- MESSAGES AREA --- */}
      <div 
        className="flex-1 overflow-y-auto pt-24 pb-24 px-4 z-10"
        onClick={() => setShowEmojiPicker(false)} // Close emoji picker if clicking chat area
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex justify-center mb-6">
            <span className="text-[10px] bg-[#fffde7] text-yellow-800 px-3 py-1 rounded-md shadow-sm border border-yellow-100">
              🔒 Messages are end-to-end encrypted.
            </span>
          </div>

          {messages.map((msg, index) => {
            const senderId = typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId;
            const isMyMessage = senderId === user._id;

            return (
              <div key={index} className={`flex w-full ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] md:max-w-[60%] px-4 py-2 rounded-2xl text-sm shadow-sm relative leading-relaxed ${isMyMessage ? 'bg-[#181E4B] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span className={`text-[10px] block text-right mt-1 ${isMyMessage ? 'text-blue-200' : 'text-gray-400'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* --- INPUT AREA --- */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 p-3 z-30">
        
        {/* Emoji Picker Popup */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4 md:right-auto md:left-4 shadow-2xl rounded-2xl z-40 animate-in slide-in-from-bottom-5 fade-in duration-200">
             <EmojiPicker 
              onEmojiClick={onEmojiClick} 
              width={300} 
              height={400} 
              searchDisabled={false}
              skinTonesDisabled={true}
              previewConfig={{ showPreview: false }}
             />
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            
            <button type="button" className="p-2 text-gray-400 hover:text-[#747def] transition-colors rounded-full hover:bg-gray-50">
              <Paperclip size={20} />
            </button>

            <div className="flex-1 bg-[#f0f2f5] rounded-full flex items-center px-4 py-2 border border-transparent focus-within:border-[#747def]/50 focus-within:bg-white focus-within:shadow-sm transition-all">
              <input 
                type="text" 
                className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onFocus={() => setShowEmojiPicker(false)} // Close picker when typing
              />
              
              {/* Toggle Emoji Button */}
              <button 
                type="button" 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`text-gray-400 hover:text-[#747def] transition-colors ml-2 ${showEmojiPicker ? 'text-[#747def]' : ''}`}
              >
                <Smile size={20} />
              </button>
            </div>
            
            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="p-3 bg-[#181E4B] text-white rounded-full hover:bg-[#747def] disabled:opacity-50 disabled:scale-100 transform active:scale-95 transition-all shadow-md flex items-center justify-center"
            >
              <Send size={18} className={newMessage.trim() ? "ml-0.5" : ""} />
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default ChatPage;