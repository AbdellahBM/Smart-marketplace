'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MissionForm from '@/components/MissionForm';
import MissionResult from '@/components/MissionResult';
import { Mission } from '@/types/mission';
import { getErrorMessage } from '@/lib/api';

export default function Home() {
  const [mission, setMission] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Animated particles effect
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      const particles = document.querySelector('.particles');
      if (particles) {
        particles.appendChild(particle);
        setTimeout(() => particle.remove(), 20000);
      }
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const handleMissionGenerated = (generatedMission: Mission) => {
    setMission(generatedMission);
    setError(null);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
    if (loading) {
      setError(null);
    }
  };

  const handleError = (error: unknown) => {
    setError(getErrorMessage(error));
    setIsLoading(false);
  };

  const handleReset = () => {
    setMission(null);
    setError(null);
    setShowForm(false);
  };

  const handleGetStarted = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen animated-bg relative overflow-hidden">
      {/* Animated particles background */}
      <div className="particles"></div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full blur-3xl floating"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-accent-400 to-primary-600 rounded-full blur-3xl floating-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-primary-500 to-accent-300 rounded-full blur-3xl floating"></div>
      </div>

      <Header />

      <main className="relative z-10">
        {!showForm && !mission ? (
          // Hero Section
          <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-6xl mx-auto text-center space-y-12">
              {/* Main Hero Content */}
              <div className="space-y-8 animate-slide-up">
                <div className="space-y-6">
                  <h1 className="text-6xl md:text-8xl font-black">
                    <span className="gradient-text">Smart</span>
                    <br />
                    <span className="text-white">Marketplace</span>
                  </h1>
                  
                  <div className="max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                      Transform your simple ideas into detailed freelance missions using 
                      <span className="gradient-text font-semibold"> cutting-edge AI technology</span>
                    </p>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
                  <div className="glass-card p-6 card-hover animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                    <p className="text-white/70">Generate detailed missions in seconds with our multi-AI system</p>
                  </div>

                  <div className="glass-card p-6 card-hover animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-accent-400 to-primary-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
                    <p className="text-white/70">Gemini, DeepSeek & Mistral AI working together seamlessly</p>
                  </div>

                  <div className="glass-card p-6 card-hover animate-slide-up" style={{animationDelay: '0.6s'}}>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary-500 to-accent-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Smart Analytics</h3>
                    <p className="text-white/70">Intelligent rate estimation and market insights</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
                  <button 
                    onClick={handleGetStarted}
                    className="btn-primary animate-pulse-glow group"
                  >
                    <span className="relative z-10">Start Creating</span>
                    <div className="absolute inset-0 bg-white/20 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </button>
                  
                  <button className="btn-secondary group">
                    <span className="mr-2">Watch Demo</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mt-20 animate-slide-up" style={{animationDelay: '0.8s'}}>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">500+</div>
                    <div className="text-white/60 text-sm">Missions Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">3</div>
                    <div className="text-white/60 text-sm">AI Providers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">98%</div>
                    <div className="text-white/60 text-sm">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">24/7</div>
                    <div className="text-white/60 text-sm">Availability</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Form and Results Section
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Back button and title */}
              <div className="text-center mb-12 animate-slide-up">
                {!mission && (
                  <button
                    onClick={handleReset}
                    className="btn-secondary mb-8 inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                  </button>
                )}
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="gradient-text">Create Your</span>
                  <br />
                  <span className="text-white">Perfect Mission</span>
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  Describe your project needs and let our AI create a comprehensive mission specification
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Form Section */}
                <div className="space-y-8">
                  <div className="glass-card p-8 animate-slide-up">
                    <MissionForm
                      onMissionGenerated={handleMissionGenerated}
                      onLoadingChange={handleLoadingChange}
                      onError={handleError}
                    />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="glass-card p-6 border-red-500/50 bg-red-500/10 animate-scale-in">
                      <div className="flex items-start space-x-3">
                        <div className="text-red-400 mt-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-red-400 font-semibold mb-1">Generation Failed</h3>
                          <p className="text-red-300/80 text-sm mb-3">{error}</p>
                          <button
                            onClick={handleReset}
                            className="text-red-400 hover:text-red-300 underline text-sm font-medium"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results Section */}
                <div className="lg:sticky lg:top-8">
                  {(isLoading || mission) && (
                    <div className="animate-slide-up">
                      <MissionResult
                        mission={mission}
                        isLoading={isLoading}
                        onReset={handleReset}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
