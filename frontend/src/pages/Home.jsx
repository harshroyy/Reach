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
    <div className="min-h-screen font-sans text-gray-900 bg-[#F8FAFC]">

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
      <section className="py-24 px-6 md:px-12 bg-transparent">
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
            <div className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-black/[0.05] shadow-[0_20px_40px_-15px_rgba(37,193,155,0.08)] hover:shadow-[0_30px_50px_-15px_rgba(37,193,155,0.12)]">
              <div className="w-14 h-14 rounded-2xl bg-[#747def] flex items-center justify-center mb-6 shadow-lg shadow-[#747def]/20">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 font-serif">Verified Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Every helper and receiver is verified before joining. We ensure a safe environment for meaningful connections.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-black/[0.05] shadow-[0_20px_40px_-15px_rgba(37,193,155,0.08)] hover:shadow-[0_30px_50px_-15px_rgba(37,193,155,0.12)]">
              <div className="w-14 h-14 rounded-2xl bg-[#F4616D] flex items-center justify-center mb-6 shadow-lg shadow-[#F4616D]/20">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 font-serif">Direct Chat</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                No middlemen. Talk directly to the people you are helping through our secure, real-time messaging system.
              </p>

              {/* 🔹 Mock Chat UI */}
              <div className="bg-white rounded-2xl p-4 space-y-3 border border-black/[0.05] shadow-[0_15px_30px_-10px_rgba(37,193,155,0.08)]">
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
            <div className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-black/[0.05] shadow-[0_20px_40px_-15px_rgba(37,193,155,0.08)] hover:shadow-[0_30px_50px_-15px_rgba(37,193,155,0.12)]">
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



      {/* --- ABOUT/MISSION SECTION --- */}
      <section className="py-24 px-6 md:px-12 bg-transparent relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#747def]/20 to-purple-500/20 rounded-3xl blur-3xl transform -rotate-3"></div>
              <img
                src={helpImg}
                alt="Community Support"
                className="relative rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,193,155,0.1)] border border-white/[0.05] object-cover w-full h-[600px]"
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
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/[0.05] shadow-[0_15px_30px_-10px_rgba(37,193,155,0.08)] hover:shadow-[0_25px_40px_-12px_rgba(37,193,155,0.12)] transition-all duration-300">
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

      <footer style={{ background: '#211832', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-6">

          <div className="flex flex-col items-center text-center mb-8">

            <div className="h-9 w-auto mb-4">
              <img src={logo2} alt="Reach Logo"
                className="h-full w-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.8 }}
              />
            </div>

            <p className="max-w-sm mx-auto text-[14px] mb-5 leading-relaxed"
              style={{ fontFamily: 'Poppins,sans-serif', color: '#6B7280' }}>
              Connecting those who need help with those willing to give. Quality support, transparent process.
            </p>

            <button
              onClick={() => window.location.href = 'mailto:support@reach.com'}
              className="flex items-center gap-2 font-semibold text-[13px] rounded-lg mb-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(37,193,155,0.10)',
                color: '#25c19b',
                border: '1px solid rgba(37,193,155,0.24)',
                padding: '9px 18px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#25c19b';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(37,193,155,0.10)';
                e.currentTarget.style.color = '#25c19b';
              }}
            >
              <Mail size={14} /> Contact Support
            </button>

            <div className="flex justify-center gap-2">
              {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
                <a key={idx} href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#4B5563'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(37,193,155,0.14)';
                    e.currentTarget.style.color = '#25c19b';
                    e.currentTarget.style.borderColor = 'rgba(37,193,155,0.28)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.color = '#4B5563';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;