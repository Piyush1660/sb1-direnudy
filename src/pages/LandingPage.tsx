import React, { useEffect, useRef, useState } from 'react';
import {
  MessageSquare,
  Github,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronDown
} from 'lucide-react';
import 'animate.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}

// Helper function for adding scroll-triggered animations with explicit ref typing
const useScrollAnimation = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__fadeInUp');
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
};

function LandingPage() {
  // Refs for scroll-triggered animations
  const aboutRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const whitelistRef = useRef<HTMLElement>(null);
  const joinRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isStaffFormOpen, setIsStaffFormOpen] = useState(true);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchFormStatus = async () => {
      try {
        const response = await axios.get('/.netlify/functions/staff-form-status');
        setIsStaffFormOpen(response.data.isStaffFormOpen);
      } catch (error) {
        console.error('Failed to fetch staff form status:', error);
      }
    };
    fetchFormStatus();
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('discordUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  // Process URL query param if coming from OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('discordUser');
    if (userParam) {
      try {
        const parsedUser = JSON.parse(userParam) as DiscordUser;
        setUser(parsedUser);
        localStorage.setItem('discordUser', JSON.stringify(parsedUser));
        // Clean the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error("Error parsing discordUser from URL:", error);
      }
    }
  }, []);

  // Initiate Discord OAuth2 flow
  const handleDiscordLogin = () => {
    const clientId = '1326593383170576434'; // Your Discord Client ID
    const redirectUri = encodeURIComponent('https://citytownrp.netlify.app/.netlify/functions/discord-auth');
    const scope = encodeURIComponent('identify email');
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  // Toggle user dropdown visibility
  const handleUserClick = () => {
    setUserDropdownOpen((prev) => !prev);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('discordUser');
    setUser(null);
    setUserDropdownOpen(false);
  };

  // Function to toggle admin dropdown visibility
  const handleAdminDropdownToggle = () => {
    setAdminDropdownOpen((prev) => !prev);
  };

  // Scroll-triggered animations
  useScrollAnimation(aboutRef);
  useScrollAnimation(featuresRef);
  useScrollAnimation(whitelistRef);
  useScrollAnimation(joinRef);
  useScrollAnimation(footerRef);

  // Dropdown state for Application Form
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white">
      {/* HEADER */}
      <header className="bg-black/50 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              City Town RP
            </h1>

            <nav className="hidden md:flex space-x-8">
              {/* CTRP Applications Dropdown */}
              <div className="relative">
                <button onClick={() => setDropdownOpen((prev) => !prev)} className="hover:text-purple-400 flex items-center gap-1">
                  CTRP Applications <ChevronDown className={`w-4 h-4 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-black/70 rounded-md shadow-lg">

                      <Link to="/streamer-application" className="block px-4 py-2 hover:text-purple-400">
                      Streamer Form
                      </Link>

                    {isStaffFormOpen ? (
                      <Link to="/staff-application" className="block px-4 py-2 hover:text-purple-400">
                        Staff Form
                      </Link>
                    ) : (
                      <div className="block px-4 py-2 text-gray-400 cursor-not-allowed">
                        Staff Form 🚫
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Admin Panel Dropdown */}
              <div className="relative">
                <button onClick={handleAdminDropdownToggle} className="hover:text-purple-400 flex items-center gap-1">
                  Admin/Staff Login <ChevronDown className={`w-4 h-4 ${adminDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {adminDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-black/70 rounded-md shadow-lg">
                    <Link to="/AdminLogin" className="block px-4 py-2 hover:text-purple-400">
                      Admin Login
                    </Link>
                    <Link to="/staff-login" className="block px-4 py-2 hover:text-purple-400">
                      Staff Login
                    </Link>
                  </div>
                )}
              </div>

              <a href="#whitelist" className="hover:text-purple-400 transition-colors">
                Whitelist
              </a>
              <Link to="/rules" className="hover:text-purple-400 transition-colors">
                Rules
              </Link>

              {/* DISCORD LOGIN / USER INFO with Dropdown */}
              {!user ? (
                <button
                  onClick={handleDiscordLogin}
                  className="hover:text-purple-400 transition-colors ml-4"
                >
                  Login with Discord
                </button>
              ) : (
                <div className="relative ml-4">
                  <button onClick={handleUserClick} className="flex items-center gap-2">
                    <img
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                      alt="Discord Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.username}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-black/70 rounded-md shadow-lg">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:text-purple-400"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="pt-32 pb-20 px-4" ref={aboutRef}>
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate__animated animate__fadeInUp animate__slow">
            Welcome to City Town RP
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__slow animate__delay-1s">
            Step into a meticulously crafted roleplay experience where your character's story
            shapes our vibrant city.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#whitelist"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold transition-all animate__animated animate__fadeInUp animate__slow animate__delay-2s"
            >
              <CheckCircle className="w-5 h-5" />
              Apply Now
            </a>
            <a
              href="https://discord.gg/6xgAJ9pnAZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] px-8 py-3 rounded-lg font-semibold transition-colors animate__animated animate__fadeInUp animate__slow animate__delay-2s"
            >
              <MessageSquare className="w-5 h-5" />
              Join Discord
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-black/30" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate__animated animate__fadeInUp animate__slow animate__delay-1s">
            Why Choose City Town RP?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all animate__animated animate__fadeInUp animate__slow">
              <h4 className="text-2xl font-semibold mb-4 text-purple-400">Quality Roleplay</h4>
              <p className="text-gray-300">
                Curated whitelisted community ensuring high-quality RP experiences and
                interactions.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all animate__animated animate__fadeInUp animate__slow">
              <h4 className="text-2xl font-semibold mb-4 text-purple-400">Active Community</h4>
              <p className="text-gray-300">
                Join our thriving community of dedicated roleplayers and make lasting
                connections.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all animate__animated animate__fadeInUp animate__slow">
              <h4 className="text-2xl font-semibold mb-4 text-purple-400">Custom Economy</h4>
              <p className="text-gray-300">
                Balanced economy system with unique jobs and business opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              About City Town RP
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              CTRP is a premier FiveM roleplay community dedicated to providing the most immersive
              and enjoyable RP experience possible. Our server features custom scripts, unique jobs,
              and a dedicated staff team to ensure the best possible environment for our players.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6">
                <h4 className="text-4xl font-bold text-purple-400 mb-2">80+</h4>
                <p className="text-gray-400">Active Players</p>
              </div>
              <div className="p-6">
                <h4 className="text-4xl font-bold text-purple-400 mb-2">30+</h4>
                <p className="text-gray-400">Custom Jobs</p>
              </div>
              <div className="p-6">
                <h4 className="text-4xl font-bold text-purple-400 mb-2">24/7</h4>
                <p className="text-gray-400">Server Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="whitelist" className="py-20" ref={whitelistRef}>
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate__animated animate__fadeInUp animate__slow animate__delay-1s">
            Whitelist Application Process
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-xl text-center animate__animated animate__fadeInUp animate__slow">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-semibold mb-4">1. Join Discord</h4>
                <p className="text-gray-400">Join our Discord server and verify your account</p>
              </div>
              <div className="bg-white/5 p-8 rounded-xl text-center animate__animated animate__fadeInUp animate__slow">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-semibold mb-4">2. Submit Application</h4>
                <p className="text-gray-400">Fill out our detailed whitelist application form</p>
              </div>
              <div className="bg-white/5 p-8 rounded-xl text-center animate__animated animate__fadeInUp animate__slow">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-semibold mb-4">3. Await Review</h4>
                <p className="text-gray-400">Applications reviewed within 24-48 hours</p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-white/5 rounded-xl animate__animated animate__fadeInUp animate__slow">
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-400" />
                Important Notes
              </h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Minimum age requirement: 16 years</li>
                <li>Previous RP experience is not Necessary</li>
                <li>Fill All the Form details Accordingly</li>
                <li>
                  Character must have realistic names, using default or non-roleplay names is
                  generally prohibited
                </li>
                <li>Working Microphone required with Push-to-talk Enabled</li>
                <li>
                  Character Backstory must be Good and Give more Efforts in it
                </li>
                <li>Must be Fluent in English/Hindi</li>
              </ul>
              <div className="mt-8 text-center">
                {/* If logged in => "Apply for Whitelist", else => "Login with Discord to Apply" */}
                {user ? (
                  <Link
                    to="/apply"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-12 py-4 rounded-lg font-semibold text-lg transition-all"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Apply for Whitelist
                  </Link>
                ) : (
                  <button
                    onClick={handleDiscordLogin}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-12 py-4 rounded-lg font-semibold text-lg transition-all"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Login with Discord to Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="py-20" ref={joinRef}>
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate__animated animate__fadeInUp animate__slow animate__delay-1s">
            Ready to Start Your Journey?
          </h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__slow animate__delay-1s">
            Join our Discord server to begin the whitelisting process and become part of our
            thriving roleplay community.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://discord.gg/6xgAJ9pnAZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] px-12 py-4 rounded-lg font-semibold text-lg transition-colors animate__animated animate__fadeInUp animate__slow animate__delay-1s"
            >
              <MessageSquare className="w-6 h-6" />
              Join Our Discord
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black/50 py-12" ref={footerRef}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                City Town RP
              </h4>
              <p className="text-gray-400">Where Stories Come to Life</p>
            </div>
            <div className="text-center">
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <div className="space-y-2">
                <a href="#whitelist" className="block text-gray-400 hover:text-purple-400 transition-colors">
                  Whitelist
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h5 className="font-semibold mb-4">Connect With Us</h5>
              <div className="flex justify-center md:justify-end space-x-6">
                <a
                  href="https://discord.gg/6xgAJ9pnAZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#5865F2] transition-colors"
                >
                  <MessageSquare className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/citytownrp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mt-2 text-sm">JOIN CTRP AND BEGIN YOUR NEW STORY</p>
            <p className="mt-2 text-sm">CTRP MANAGEMENT</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
