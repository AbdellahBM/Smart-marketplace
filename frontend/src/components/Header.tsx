'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">SmartMarketplace</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#docs" className="nav-link">Documentation</a>
            <a href="#about" className="nav-link">About</a>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* AI Status Indicator */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm font-medium">AI Online</span>
            </div>

            {/* Action Buttons */}
            <button className="btn-secondary text-sm">
              Sign In
            </button>
            <button className="btn-primary text-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden glass-card p-2 text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-card mt-2 p-4 space-y-4 animate-slide-up">
            <nav className="space-y-3">
              <a href="#features" className="block nav-link">Features</a>
              <a href="#pricing" className="block nav-link">Pricing</a>
              <a href="#docs" className="block nav-link">Documentation</a>
              <a href="#about" className="block nav-link">About</a>
            </nav>
            
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">AI Systems Online</span>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button className="btn-secondary text-sm w-full">Sign In</button>
                <button className="btn-primary text-sm w-full">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
