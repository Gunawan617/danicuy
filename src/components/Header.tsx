// src/components/Header.tsx
"use client";
import { useState } from "react";
import { useAuth } from "./AuthGuard";
import AuthModal from "./AuthModal";

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleShowRegister = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMobileLinkClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="bg-slate-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md transform hover:scale-105">
            <span className="font-bold text-white text-xs sm:text-sm">Klinik UKOM</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              href="/"
              className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/#programs"
              className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
            >
              Kelas
            </a>
            <a
              href="/buku"
              className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
            >
              Buku
            </a>
            {isLoggedIn && (
              <>
                <a
                  href="/dashboard"
                  className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
                >
                  Dashboard
                </a>
                {/* Link Admin - sementara tampilkan untuk semua user yang login */}
                {/* Dalam production, periksa role admin dari database */}
                <a
                  href="/admin"
                  className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
                >
                  Admin Panel
                </a>
              </>
            )}
          {/* <a
            href="/tryout"
            className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
          >
            Tryout
          </a>
          <a
            href="/bimbel"
            className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
          >
            Bimbel
          </a> */}
          <a
            href="/artikel"
            className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
          >
            Artikel
          </a>
          <a
            href="/faq"
            className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
          >
            FAQ
          </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-slate-700 text-sm font-medium">Halo, {user.nama}</span>
                <button
                  onClick={handleLogout}
                  className="text-slate-600 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleShowLogin}
                  className="text-slate-700 text-sm hover:text-slate-900 font-medium transition-colors duration-300"
                >
                  Masuk
                </button>
                <button
                  onClick={handleShowRegister}
                  className="bg-slate-900 text-white px-4 lg:px-5 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                >
                  Registrasi
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuClick}
              className="text-slate-700 hover:text-slate-900 transition-colors duration-300 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  showMobileMenu ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            showMobileMenu ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-6 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
            {/* Mobile Navigation - Organized Dropdown Style */}
            <nav className="space-y-4">
              {/* Main Navigation Links */}
              <div className="space-y-2">
                <a
                  href="/"
                  onClick={handleMobileLinkClick}
                  className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </a>
                <a
                  href="/#programs"
                  onClick={handleMobileLinkClick}
                  className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100"
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Kelas
                </a>
              </div>

              {/* Services Section */}
              <div className="border-t border-slate-100 pt-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-4">
                  Layanan
                </div>
                <div className="space-y-1">
                  <a
                    href="/tryout"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 ml-2"
                  >
                    <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tryout
                  </a>
                  <a
                    href="/bimbel"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 ml-2"
                  >
                    <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Bimbel
                  </a>
                </div>
              </div>

              {/* Content Section */}
              <div className="border-t border-slate-100 pt-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-4">
                  Konten
                </div>
                <div className="space-y-1">
                  <a
                    href="/buku"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 ml-2"
                  >
                    <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Buku
                  </a>
                  <a
                    href="/artikel"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 ml-2"
                  >
                    <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Artikel
                  </a>
                  {isLoggedIn && (
                    <>
                      <a
                        href="/dashboard"
                        onClick={handleMobileLinkClick}
                        className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 ml-2"
                      >
                        <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </a>
                      <a
                        href="/admin"
                        onClick={handleMobileLinkClick}
                        className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 ml-2"
                      >
                        <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Admin Panel
                      </a>
                    </>
                  )}
                  <a
                    href="/faq"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 ml-2"
                  >
                    <svg className="w-3.5 h-3.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FAQ
                  </a>
                </div>
              </div>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="border-t border-slate-100 pt-4">
              {isLoggedIn && user ? (
                <div className="space-y-3">
                  <div className="flex items-center text-slate-700 text-sm font-medium px-4 py-2">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Halo, {user.nama}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleMobileLinkClick();
                    }}
                    className="flex items-center text-slate-600 text-sm hover:text-slate-900 font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-slate-50 hover:text-red-600 w-full text-left mx-2"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      handleShowLogin();
                      handleMobileLinkClick();
                    }}
                    className="flex items-center text-slate-700 text-sm font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 w-full text-left mx-2"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Masuk
                  </button>
                  <button
                    onClick={() => {
                      handleShowRegister();
                      handleMobileLinkClick();
                    }}
                    className="flex items-center justify-center bg-slate-900 text-white px-4 py-3 rounded-lg text-sm hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md font-medium w-full mx-2"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Registrasi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </header>
  );
}