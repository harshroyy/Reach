import { useState, useContext, useEffect } from 'react';
import {
  User, MapPin, Github, Linkedin, Twitter, Save, X, Edit3,
  CheckCircle2, Camera, Link as LinkIcon, Briefcase, Calendar,
  Award, Zap, LayoutGrid
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    headline: '',
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    twitter: '',
    profileImage: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        city: user.city || '',
        headline: user.headline || '',
        bio: user.bio || '',
        skills: user.helperProfile?.skills?.join(', ') || user.receiverProfile?.needs?.join(', ') || '',
        github: user.socials?.github || '',
        linkedin: user.socials?.linkedin || '',
        twitter: user.socials?.twitter || '',
        profileImage: user.profileImage || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    const toastId = toast.loading("Saving changes...");

    try {
      const payload = {
        name: formData.name,
        city: formData.city,
        headline: formData.headline,
        bio: formData.bio,
        profileImage: formData.profileImage,
        socials: {
          github: formData.github,
          linkedin: formData.linkedin,
          twitter: formData.twitter
        }
      };

      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);

      if (user.role === 'helper') {
        payload.skills = skillsArray;
      } else {
        payload.needs = skillsArray;
      }

      const res = await api.put('/users/profile', payload);
      login(res.data, res.data.token);
      setIsEditing(false);
      toast.success("Profile updated successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#747def]"></div></div>;

  return (
    <div className="min-h-screen bg-[#ebf2fa] pb-20">

      {/* --- COVER SECTION --- */}
      <div className="h-80 bg-gradient-to-r from-[#181E4B] via-[#2A3468] to-[#181E4B] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-10 right-20 w-64 h-64 bg-[#747def] rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-50px] left-10 w-64 h-64 bg-[#F4616D] rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative -mt-32 z-10">

        {/* --- MAIN HEADER CARD --- */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/50 p-8 mb-8 flex flex-col md:flex-row gap-8 items-start relative">

          {/* 1. Avatar Section */}
          <div className="flex-shrink-0 relative group mx-auto md:mx-0">
            <div className="w-40 h-40 rounded-[2rem] p-1.5 bg-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-full rounded-[1.7rem] overflow-hidden bg-[#ebf2fa] relative">
                {(isEditing ? formData.profileImage : user.profileImage) ? (
                  <img
                    src={isEditing ? formData.profileImage : user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                  />
                ) : null}

                {/* Fallback Initial */}
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#ebf2fa] to-white text-6xl font-bold text-[#747def] font-serif ${(isEditing ? formData.profileImage : user.profileImage) ? 'hidden' : 'flex'}`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-[#5E6282] border border-gray-100">
                <Camera size={20} />
              </div>
            )}
          </div>

          {/* 2. Identity Section */}
          <div className="flex-1 w-full text-center md:text-left pt-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-2 w-full">
                {isEditing ? (
                  <div className="space-y-4 max-w-lg">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-3xl font-bold text-[#181E4B] border-b-2 border-gray-200 focus:border-[#747def] outline-none w-full bg-transparent px-1 py-1 transition-colors"
                      placeholder="Your Name"
                    />
                    <input
                      name="headline"
                      value={formData.headline}
                      onChange={handleChange}
                      className="text-lg text-[#5E6282] border-b border-gray-200 focus:border-[#747def] outline-none w-full bg-transparent px-1 py-1 transition-colors"
                      placeholder="Headline (e.g. Student at IIT)"
                    />
                    {/* Image URL Input */}
                    <div className="flex items-center gap-2 bg-[#ebf2fa] p-3 rounded-xl border border-gray-200 focus-within:border-[#747def] transition-colors">
                      <LinkIcon size={16} className="text-[#747def]" />
                      <input
                        name="profileImage"
                        value={formData.profileImage}
                        onChange={handleChange}
                        className="text-sm bg-transparent w-full outline-none text-[#181E4B] placeholder-gray-400"
                        placeholder="Paste Profile Image URL..."
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold text-[#181E4B] flex items-center justify-center md:justify-start gap-3" style={{ fontFamily: "sans-serif" }}>
                      {user.name}
                      {user.isVerified && <CheckCircle2 size={24} className="text-[#747def] fill-[#ebf2fa]" />}
                    </h1>
                    <p className="text-xl text-[#5E6282] font-medium">
                      {user.headline || "Community Member"}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-gray-400 text-sm mt-2">
                      <div className="flex items-center gap-1 bg-[#ebf2fa] px-3 py-1 rounded-full border border-gray-100/50">
                        <MapPin size={14} className="text-[#747def]" /> <span className="text-[#5E6282]">{user.city || "Earth"}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#ebf2fa] px-3 py-1 rounded-full border border-gray-100/50">
                        <Briefcase size={14} className="text-[#747def]" /> <span className="capitalize text-[#5E6282]">{user.role}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#ebf2fa] px-3 py-1 rounded-full border border-gray-100/50">
                        <Calendar size={14} className="text-[#747def]" /> <span className="text-[#5E6282]">Joined 2024</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Edit Button */}
              <div className="absolute top-6 right-6 md:static">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="p-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                      <X size={20} />
                    </button>
                    <button onClick={handleSave} disabled={loading} className="px-6 py-3 bg-[#181E4B] text-white rounded-xl font-bold hover:bg-[#2A3468] shadow-lg shadow-[#181E4B]/20 flex items-center gap-2 transition-all">
                      <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 border border-gray-200 bg-white rounded-xl text-[#5E6282] font-bold hover:bg-[#ebf2fa] hover:text-[#181E4B] flex items-center gap-2 shadow-sm transition-all">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- GRID CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: STATS & SOCIALS */}
          <div className="space-y-8">

            {/* Impact Stats */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#181E4B] mb-6 flex items-center gap-2">
                <LayoutGrid size={20} className="text-[#747def]" /> Impact Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#ebf2fa] p-5 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-[#181E4B] mb-1">0</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Requests</div>
                </div>
                <div className="bg-[#ebf2fa] p-5 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-[#747def] mb-1">0</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Helped</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-[#747def] to-[#181E4B] rounded-2xl text-white flex items-center gap-4 shadow-lg shadow-[#747def]/20">
                <div className="p-2 bg-white/20 rounded-full"><Award size={24} /></div>
                <div>
                  <p className="text-xs font-bold opacity-80 uppercase">Current Badge</p>
                  <p className="font-bold text-lg">New Member</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#181E4B] mb-6">Connect</h3>
              <div className="space-y-4">
                {['github', 'linkedin', 'twitter'].map((platform) => (
                  <div key={platform} className="flex items-center gap-3 p-3 hover:bg-[#ebf2fa] rounded-xl transition-colors group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ebf2fa] text-[#5E6282] group-hover:text-[#747def] transition-colors">
                      {platform === 'github' && <Github size={18} />}
                      {platform === 'linkedin' && <Linkedin size={18} />}
                      {platform === 'twitter' && <Twitter size={18} />}
                    </div>

                    {isEditing ? (
                      <input
                        name={platform}
                        value={formData[platform]}
                        onChange={handleChange}
                        placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Username`}
                        className="flex-1 text-sm border-b border-gray-200 focus:border-[#747def] outline-none bg-transparent py-1 placeholder-gray-400 text-[#181E4B]"
                      />
                    ) : (
                      <span className="text-sm font-medium text-[#5E6282] group-hover:text-[#181E4B] transition-colors">
                        {user.socials?.[platform] ? `@${user.socials[platform]}` : <span className="text-gray-400 italic font-normal">Not connected</span>}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: BIO & SKILLS */}
          <div className="lg:col-span-2 space-y-8">

            {/* About Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 min-h-[200px]">
              <h3 className="text-xl font-bold text-[#181E4B] mb-6 flex items-center gap-2">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#747def]/20 focus:border-[#747def] outline-none resize-none leading-relaxed text-[#181E4B] placeholder-gray-400"
                  placeholder="Tell the community about your journey, interests, and how you can help..."
                />
              ) : (
                <p className="text-[#5E6282] leading-relaxed text-lg font-light">
                  {user.bio || <span className="italic text-gray-400">This user hasn't written a bio yet.</span>}
                </p>
              )}
            </div>

            {/* Skills / Needs Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#181E4B] mb-6 flex items-center gap-2">
                <Zap size={20} className="text-[#F4616D]" />
                {user.role === 'helper' ? 'Skills & Expertise' : 'Looking for Help With'}
              </h3>

              {isEditing ? (
                <div className="bg-[#ebf2fa] p-6 rounded-2xl border border-dashed border-gray-300">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Add Tags (Comma Separated)</p>
                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#747def] text-sm text-[#181E4B]"
                    placeholder="e.g. Python, Calculus, React, Career Advice..."
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.skills.split(',').filter(s => s.trim()).map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-[#181E4B] text-xs font-bold rounded-lg border border-gray-100 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {(user.helperProfile?.skills || user.receiverProfile?.needs || []).length > 0 ? (
                    (user.helperProfile?.skills || user.receiverProfile?.needs).map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#ebf2fa] text-[#181E4B] rounded-xl text-sm font-bold border border-[#747def]/20 hover:bg-[#747def]/10 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-sm">No tags added yet.</span>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;