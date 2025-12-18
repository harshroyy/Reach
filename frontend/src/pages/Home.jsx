import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Updated imports to include new icons for the footer
import { 
  Shield, 
  MessageCircle, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  ArrowUp 
} from "lucide-react";

// Assets
import heroImg from '../assets/hero.jpg';
import logo2 from '../assets/logo2.png';
import himanshu from '../assets/himanshu.jpg';
import helpImg from '../assets/help.png';

// Components
import LiquidGlassCard from '../components/LiquidGlassCard';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Toggle functions
  const switchToRegister = () => {
    setIsLoginOpen(false);
    setTimeout(() => setIsRegisterOpen(true), 200);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setTimeout(() => setIsLoginOpen(true), 200);
  };

  // Scroll to Top Functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50">

      {/* --- MOUNT MODALS --- */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={switchToRegister}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={switchToLogin}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* 1. Background Image Covering Everything */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay to make text pop */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        </div>

        {/* 2. Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Glass Box - Left Aligned */}
            <LiquidGlassCard
              shadowIntensity="xs"
              borderRadius="8px"
              glowIntensity="none"
              className="p-10 md:p-12 text-white !bg-white/8 text-left animate-fade-in-up lg:-translate-x-6"
            >

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 tracking-tight"
                style={{ fontFamily: "'Vollkorn', 'Volkhov', serif" }}
              >
                Where <span className="text-[#2DD4BF]">Kindness</span><br />
                Finds a <span className="text-[#2DD4BF]">Destination</span>
              </h1>

              <p
                className="text-lg text-gray-300 leading-relaxed mb-8 font-medium max-w-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                We bridge the gap between giving and need. Skip the uncertainty and connect directly with <span className="font-bold text-white">verified people</span> seeking <span className="font-bold text-white">genuine support</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-xl shadow-[#0D9488]/10 font-bold text-lg flex items-center justify-center gap-2 group"
                  style={{ fontFamily: "'Vollkorn', 'Volkhov', serif" }}
                >
                  Get Help
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-8 py-4 rounded-xl bg-[#25c19b] text-white hover:bg-teal-700 transition-all duration-300 font-bold text-lg"
                  style={{ fontFamily: "'Vollkorn', 'Volkhov', serif" }}
                >
                  I Want to Help
                </button>
              </div>

            </LiquidGlassCard>

            {/* Empty Right Column */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-[#181E4B] mb-4"
              style={{ fontFamily: "'Vollkorn', 'Volkhov', serif" }}
            >
              Why Choose Reach?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A safe, transparent, and direct way to make a difference in someone's life today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-50/50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-blue-100">
              <div className="w-14 h-14 rounded-2xl bg-[#747def] flex items-center justify-center mb-6 shadow-lg shadow-[#747def]/20">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 font-serif">Verified Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Every helper and receiver is verified before joining. We ensure a safe environment for meaningful connections.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-purple-50/50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-purple-100">
              <div className="w-14 h-14 rounded-2xl bg-[#F4616D] flex items-center justify-center mb-6 shadow-lg shadow-[#F4616D]/20">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 font-serif">Direct Chat</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                No middlemen. Talk directly to the people you are helping through our secure, real-time messaging system.
              </p>

              {/* 🔹 Mock Chat UI */}
              <div className="bg-white rounded-2xl p-4 space-y-3 border border-purple-100 shadow-sm">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold text-purple-700">A</div>
                  <div className="flex-1 bg-purple-50 rounded-xl px-4 py-2 text-sm text-gray-700">Hey! I can help you today 🙂</div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-[#F4616D] rounded-xl px-4 py-2 text-sm text-white">Thank you! That means a lot ❤️</div>
                  <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-xs font-bold text-pink-700">Me</div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-pink-50/50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-pink-100">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 font-serif">Zero Fees</h3>
              <p className="text-gray-600 leading-relaxed">
                Reach is 100% free to use. We don't take a cut. Your kindness goes directly to where it is needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STORY SECTION (HIMANSHU) --- */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Side: The Story */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">

              {/* Header */}
              <h2
                className="text-4xl md:text-5xl font-bold text-[#181E4B] leading-[1.15] mb-6"
                style={{ fontFamily: "'Vollkorn', 'Volkhov', serif" }}
              >
                Real People,
                <span className="text-[#25c19b]"> Real Impact</span>
              </h2>

              {/* Stylized Quote */}
              <figure className="mb-8">
                <blockquote
                  className="text-xl md:text-2xl font-medium text-[#181E4B]/80 leading-snug italic"
                  style={{ fontFamily: "'Vollkorn', serif" }}
                >
                  "A little help at the right time can change an entire future."
                </blockquote>
                <div className="w-16 h-1 bg-[#25c19b] mt-4 rounded-full"></div>
              </figure>

              {/* Story Copy */}
              <div className="space-y-5 text-lg text-[#5E6282] leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                <p>
                  Meet <span className="font-bold text-[#181E4B]">Himanshu</span>. A brilliant student with dreams of becoming an engineer, his path is currently blocked by a significant <strong className="text-[#181E4B]">financial hurdle</strong>.
                </p>
                <p>
                  With his father facing physical challenges and unable to work, the weight of <strong className="text-[#181E4B]">supporting the family</strong> and funding his own education has fallen on Himanshu's young shoulders. The college fees seem insurmountable, threatening to cut his promising journey short.
                </p>
                <p>
                  Your support isn't just a donation; it's an <strong className="text-[#181E4B]">investment in potential</strong>, a lifeline that allows talent like Himanshu's to flourish despite the odds.
                </p>
              </div>
            </div>

            {/* Right Side: Enhanced Card Design */}
            <div className="relative order-1 lg:order-2 group">

              {/* Main Card Container */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gray-900 transform transition-transform duration-500 hover:scale-[1.01]">

                <img
                  src={himanshu}
                  alt="Himanshu - Engineering Student"
                  className="w-full h-[550px] object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Verified Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
                  <ShieldCheck className="w-4 h-4 text-[#2DD4BF] fill-current" />
                  <span className="text-xs font-bold text-[#181E4B] tracking-wide uppercase">Verified by Reach</span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#0e122b] via-[#0e122b]/80 to-transparent"></div>

                {/* Card Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">

                  <div className="space-y-1 mb-6">
                    <h3 className="text-3xl font-bold" style={{ fontFamily: "'Vollkorn', serif" }}>
                      Help Himanshu Graduate
                    </h3>
                    <p className="text-gray-300 font-medium tracking-wide text-sm flex items-center gap-2">
                      Aspiring Engineer • Family Support
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                      <span>₹1,40,000 raised</span>
                      <span>70% of Goal</span>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="bg-[#2DD4BF] h-full rounded-full w-[70%] shadow-[0_0_10px_#2DD4BF]"></div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className="group/btn relative bg-[#25c19b] hover:bg-[#25c19b] text-white py-3.5 px-8 rounded-full font-bold text-lg shadow-lg hover:shadow-[#25c19b]/20 transition-all duration-300 flex items-center gap-3"
                      style={{ fontFamily: "'Vollkorn', 'Volkhov', serif" }}
                    >
                      Support Himanshu's Journey
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Decorative background */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-[#2DD4BF]/30 rounded-[2rem] hidden md:block"></div>

            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT/MISSION SECTION --- */}
      <section className="py-24 px-6 md:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#747def]/20 to-purple-500/20 rounded-3xl blur-3xl transform -rotate-3"></div>
              <img
                src={helpImg}
                alt="Community Support"
                className="relative rounded-[2.5rem] shadow-2xl object-cover w-full h-[600px]"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-[#181E4B] leading-tight" style={{ fontFamily: "'Vollkorn', 'Volkhov', serif" }}>
                  More Than Just a <br />
                  <span className="text-[#25c19b]">Platform</span>
                </h2>
                <p className="text-lg text-[#5E6282] leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
                  In a world that often feels disconnected, Reach brings us back to our roots: people helping people. We believe that asking for help isn't a sign of weakness—it's the first step toward connection.
                </p>
              </div>
              <div className="space-y-4">
                {["Strengthens community bonds and trust", "Reduces stress for those in need", "Creates a positive cycle of kindness", "Verified and safe interactions"].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#25c19b]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#25c19b]" />
                    </div>
                    <span className="text-[#181E4B] font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW WAVE FOOTER --- */}
      <footer className="relative bg-white pt-24 overflow-hidden">
        
        {/* Top Content (Centered) */}
        <div className="container mx-auto px-6 text-center relative z-20 pb-48">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="h-14 w-auto">
               <img src={logo2} alt="Logo" className="h-full w-auto" />
            </div>
          </div>
          
          {/* Tagline */}
          <p className="text-[#5E6282] max-w-lg mx-auto text-lg mb-8 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
             High level experience in connecting those who need help with those willing to give. Quality support, transparent process.
          </p>
          
          {/* CTA Button */}
          <button 
             onClick={() => window.location.href = 'mailto:support@reach.com'}
             className="bg-[#25c19b] hover:bg-[#5e63c2] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#747def]/30 transition-all hover:scale-105 mb-10 flex items-center gap-2 mx-auto"
          >
             <Mail size={18} /> Contact Support
          </button>
          
          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#747def] hover:text-white transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* --- WAVE BACKGROUND (Absolute Bottom) --- */}
        <div className="absolute bottom-0 left-0 right-0 w-full leading-none z-10">
           <svg viewBox="0 0 1440 320" className="w-full block h-auto">
              <path fill="#25c19b" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
           
           {/* Copyright & Scroll To Top (Sitting ON the Wave) */}
           <div className="absolute bottom-4 w-full px-6 md:px-12 flex justify-between items-center text-white/90 text-sm font-medium z-30">
              <p>© 2025 Reach. All Rights Reserved.</p>
              
              <button 
                 onClick={scrollToTop}
                 className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white hover:text-[#747def] transition-all"
              >
                 <ArrowUp size={20} />
              </button>
           </div>
        </div>

      </footer>

    </div>
  );
}

export default Home;