import React from 'react';
import { Heart, Shield, Users, Globe, ArrowRight } from "lucide-react";
import logo2 from '../assets/logo2.png';
import aboutImg from '../assets/about.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-20">

      {/* --- HEADER IMAGE --- */}
      <div className="w-full">
        <img
          src={aboutImg}
          alt="About Team"
          className="w-full h-[300px] md:h-[500px] object-cover"
        />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 -z-10"></div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#25c19b]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F4616D]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#181E4B] leading-[1.1] mb-8"
            style={{ fontFamily: "'Vollkorn', serif" }}
          >
            Bridging the gap between <br />
            <span className="text-[#F4616D]">Empathy</span> and <span className="text-[#25c19b]">Action</span>.
          </h1>
          <p
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            We built Reach because we believe the world is full of people who want to help. The problem isn't a lack of kindness—it's a lack of connection.
          </p>
        </div>
      </section>

      {/* --- OUR STORY / MOTIVES --- */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
              alt="Community"
              className="rounded-3xl shadow-lg w-full h-64 object-cover transform translate-y-8"
            />
            <img
              src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop"
              alt="Helping Hand"
              className="rounded-3xl shadow-lg w-full h-64 object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2
              className="text-4xl font-bold text-[#181E4B]"
              style={{ fontFamily: "'Vollkorn', serif" }}
            >
              Why We Started
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
              In today's digital world, it's ironic that while we are more connected than ever, asking for help feels harder than ever. Traditional crowdfunding often feels impersonal, and asking on social media can feel exposing.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
              <strong className="text-[#181E4B]">Reach</strong> was born from a simple idea: What if we could remove the friction? What if we could create a safe, dignified space where needs are verified, and help is direct?
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-3 text-[#181E4B] font-medium mb-2">
                <CheckCircle2 size={20} className="text-[#2DD4BF]" /> <span>No Middlemen (100% Direct)</span>
              </div>
              <div className="flex items-center gap-3 text-[#181E4B] font-medium mb-2">
                <CheckCircle2 size={20} className="text-[#2DD4BF]" /> <span>Verified & Safe Interactions</span>
              </div>
              <div className="flex items-center gap-3 text-[#181E4B] font-medium">
                <CheckCircle2 size={20} className="text-[#2DD4BF]" /> <span>Dignity First Approach</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-24 px-6 md:px-12 bg-[#181E4B] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-4xl font-bold mb-16"
            style={{ fontFamily: "'Vollkorn', serif" }}
          >
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#25c19b] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empathy</h3>
              <p className="text-gray-300 text-sm leading-relaxed">We believe asking for help is an act of bravery, not weakness.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#F4616D] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust</h3>
              <p className="text-gray-300 text-sm leading-relaxed">We verify every user to ensure a safe environment for everyone.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#2DD4BF] rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-gray-300 text-sm leading-relaxed">No hidden fees. We don't take a cut of the kindness.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-300 text-sm leading-relaxed">We are building a network of neighbors helping neighbors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold text-[#181E4B] mb-6" style={{ fontFamily: "'Vollkorn', serif" }}>
          Ready to make a difference?
        </h2>
        <a href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-[#25c19b] text-white rounded-full font-bold hover:bg-[#1fa383] transition-colors shadow-lg">
          Join the Movement <ArrowRight size={20} />
        </a>
      </section>

    </div>
  );
};

// Helper Icon for the list
const CheckCircle2 = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="20"
    height="20"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default About;