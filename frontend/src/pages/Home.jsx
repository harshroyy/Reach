import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          
          {/* Left: Text */}
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Connect. Help. <br/><span className="text-blue-200">Grow Together.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              HelpLink connects people who need support with kind individuals ready to offer skills, resources, or mentorship. Safe, simple, and free.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
                Get Started
              </Link>
              <Link to="/login" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition">
                Login
              </Link>
            </div>
          </div>

          {/* Right: Illustration (Placeholder) */}
          <div className="md:w-1/2 flex justify-center">
            {/* You can replace this img src with a real illustration later */}
            <img 
              src="https://img.freepik.com/free-vector/charity-colorful-illustration_24908-56952.jpg?w=826&t=st=1709123456~exp=1709124056~hmac=..." 
              alt="Community Support" 
              className="rounded-lg shadow-2xl max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">How HelpLink Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Create a Profile</h3>
              <p className="text-gray-600">Sign up as a <span className="font-bold">Receiver</span> if you need help, or a <span className="font-bold">Helper</span> if you want to offer it.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Connect Safely</h3>
              <p className="text-gray-600">Receivers browse verified helpers and send requests. Helpers review and accept requests they can fulfill.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Chat & Solve</h3>
              <p className="text-gray-600">Once matched, a private chat opens. Discuss details, arrange support, and make a difference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA FOOTER */}
      <section className="bg-gray-800 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Ready to make a difference?</h2>
        <p className="mb-8 text-gray-400 max-w-2xl mx-auto">Join hundreds of students and professionals building a network of kindness.</p>
        <Link to="/register" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition shadow-lg">
          Join Now - It's Free
        </Link>
      </section>
      
    </div>
  );
};

export default Home;