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
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleCreateProject = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content Area */}
      <main className="lg:ml-64 pt-16">
        {!showForm && !mission ? (
          <>
            {/* Hero Section - Card Based Layout */}
            <section className="py-12 bg-gradient-to-br from-slate-50 to-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Card */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center px-6 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
                    ⚡ 127,000+ developers trust DevFlow Platform
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Code Smarter,
                    <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Ship Faster
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    The all-in-one development platform that accelerates your workflow with intelligent automation and seamless collaboration tools.
                  </p>
                </div>

                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Development Speed</h3>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 mb-1">340%</div>
                    <p className="text-gray-600 text-sm">Faster deployment</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Code Quality</h3>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">99.2%</div>
                    <p className="text-gray-600 text-sm">Bug-free releases</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '99%'}}></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Global Reach</h3>
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">195</div>
                    <p className="text-gray-600 text-sm">Countries served</p>
                    <div className="flex items-center mt-3 space-x-2">
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">24/7</span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Multi-region</span>
                    </div>
                  </div>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Start Building Today</h3>
                    <p className="text-emerald-100 mb-6">Join thousands of developers who ship code 10x faster with our platform.</p>
                    <button 
                      onClick={handleCreateProject}
                      className="w-full py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Launch Project</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Solutions</h3>
                    <p className="text-gray-600 mb-6">Custom deployment options with dedicated support for large teams.</p>
                    <button className="w-full py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                      Schedule Demo
                    </button>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 text-center">
                  <p className="text-gray-500 text-sm mb-4">Trusted by leading companies worldwide</p>
                  <div className="flex items-center justify-center space-x-8 opacity-60">
                    {['TechCorp', 'InnovateLab', 'DevStudio', 'CloudFirst', 'AppBuilder'].map((company) => (
                      <div key={company} className="text-gray-400 font-semibold text-lg">{company}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Workflow Timeline */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    DevFlow Timeline
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    From concept to deployment in record time with our streamlined workflow
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-emerald-400 to-blue-500 hidden lg:block"></div>
                  
                  <div className="space-y-12">
                    {/* Timeline Item 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-right lg:pr-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Initialize & Configure</h3>
                          <p className="text-gray-600 mb-4">Set up your development environment with smart templates and automated configurations in under 60 seconds.</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Auto-setup
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Templates
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="relative lg:pl-12">
                        <div className="absolute left-0 lg:left-1/2 top-8 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm transform lg:-translate-x-1/2 z-10">
                          01
                        </div>
                        <div className="bg-emerald-50 rounded-2xl p-8 ml-12 lg:ml-0">
                          <div className="text-emerald-800 font-semibold mb-2">⚡ Average Setup Time</div>
                          <div className="text-3xl font-bold text-emerald-600">47 seconds</div>
                          <div className="text-emerald-700 text-sm mt-1">73% faster than manual setup</div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Item 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="lg:order-2 lg:pl-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Code & Collaborate</h3>
                          <p className="text-gray-600 mb-4">Write code with intelligent assistance, real-time collaboration, and automated quality checks built right in.</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              AI Assistant
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Live Collab
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="relative lg:pr-12 lg:order-1">
                        <div className="absolute right-0 lg:right-1/2 top-8 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm transform lg:translate-x-1/2 z-10">
                          02
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-8 mr-12 lg:mr-0">
                          <div className="text-blue-800 font-semibold mb-2">🚀 Code Quality Score</div>
                          <div className="text-3xl font-bold text-blue-600">9.4/10</div>
                          <div className="text-blue-700 text-sm mt-1">Above industry average</div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Item 3 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-right lg:pr-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Test & Deploy</h3>
                          <p className="text-gray-600 mb-4">Automated testing pipelines and one-click deployment to multiple environments with zero configuration.</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Auto Testing
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              One-click Deploy
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="relative lg:pl-12">
                        <div className="absolute left-0 lg:left-1/2 top-8 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm transform lg:-translate-x-1/2 z-10">
                          03
                        </div>
                        <div className="bg-purple-50 rounded-2xl p-8 ml-12 lg:ml-0">
                          <div className="text-purple-800 font-semibold mb-2">📈 Success Rate</div>
                          <div className="text-3xl font-bold text-purple-600">98.7%</div>
                          <div className="text-purple-700 text-sm mt-1">First-time deployments</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tech Stack Showcase */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Powered by Industry-Leading Technology
                  </h2>
                  <p className="text-xl text-gray-600">
                    Built with modern tools and frameworks that scale with your business
                  </p>
                </div>
                
                {/* Tech Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
                  {[
                    { name: 'React', logo: '⚛️', color: 'bg-blue-50 text-blue-600' },
                    { name: 'Node.js', logo: '🟢', color: 'bg-green-50 text-green-600' },
                    { name: 'TypeScript', logo: '📘', color: 'bg-blue-50 text-blue-700' },
                    { name: 'Docker', logo: '🐳', color: 'bg-cyan-50 text-cyan-600' },
                    { name: 'AWS', logo: '☁️', color: 'bg-orange-50 text-orange-600' },
                    { name: 'GraphQL', logo: '🔗', color: 'bg-pink-50 text-pink-600' }
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className={`${tech.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer`}
                    >
                      <div className="text-3xl mb-3">{tech.logo}</div>
                      <div className="font-semibold text-sm">{tech.name}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">Complete Project Management</h3>
                        <p className="text-gray-600 text-lg">From initial consultation to final delivery, we provide end-to-end project management tools that keep your projects on track.</p>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-800">Real-time progress tracking</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-800">Built-in communication tools</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-800">Milestone-based payments</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8">
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">Website Redesign</span>
                              <span className="text-sm text-gray-500">75% complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">Mobile App</span>
                              <span className="text-sm text-gray-500">40% complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{width: '40%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'matching' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">AI-Powered Matching</h3>
                        <p className="text-gray-600 text-lg">Our advanced AI algorithm analyzes over 200 data points to find the perfect freelancer for your specific project needs.</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600">97%</div>
                            <div className="text-sm text-gray-600">Match Accuracy</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600">2.3s</div>
                            <div className="text-sm text-gray-600">Avg Match Time</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
                        <div className="space-y-4">
                          {['Skills Analysis', 'Portfolio Review', 'Performance History', 'Availability Check'].map((item, index) => (
                            <div key={item} className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="text-gray-800">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">Enterprise-Grade Security</h3>
                        <p className="text-gray-600 text-lg">Your projects and payments are protected by bank-level security measures and comprehensive insurance coverage.</p>
                        <div className="space-y-3">
                          {['256-bit SSL encryption', 'PCI DSS compliant', 'GDPR compliant', 'SOC 2 certified'].map((feature) => (
                            <div key={feature} className="flex items-center space-x-3">
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-gray-800">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-64 h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-32 h-32 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'support' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900">24/7 Expert Support</h3>
                        <p className="text-gray-600 text-lg">Our dedicated support team is available around the clock to help resolve any issues and ensure your projects run smoothly.</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">&lt;2min</div>
                            <div className="text-sm text-gray-600">Response Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">99.9%</div>
                            <div className="text-sm text-gray-600">Resolution Rate</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { channel: 'Live Chat', available: '24/7', icon: '💬' },
                          { channel: 'Phone Support', available: '24/7', icon: '📞' },
                          { channel: 'Email Support', available: '24/7', icon: '✉️' },
                          { channel: 'Video Call', available: 'On Request', icon: '📹' }
                        ].map((item) => (
                          <div key={item.channel} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{item.icon}</span>
                              <span className="font-medium text-gray-900">{item.channel}</span>
                            </div>
                            <span className="text-sm text-gray-600">{item.available}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Trusted by Industry Leaders
                  </h2>
                  <p className="text-xl text-gray-300">
                    Join thousands of companies that have transformed their hiring process
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400">15K+</div>
                    <div className="text-gray-300">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400">75K+</div>
                    <div className="text-gray-300">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400">200+</div>
                    <div className="text-gray-300">Countries Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400">4.9★</div>
                    <div className="text-gray-300">Average Rating</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of successful companies who have found their perfect freelance teams through FreelanceAI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleCreateProject}
                    className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Start Your First Project
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-200">
                    Schedule a Demo
                  </button>
                </div>
                <p className="text-sm text-gray-200 mt-6">
                  ✓ No credit card required  ✓ Setup in under 5 minutes  ✓ Cancel anytime
                </p>
              </div>
            </section>
          </>
        ) : (
          // Form and Results Section - Clean Design
          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                {!mission && (
                  <button
                    onClick={handleReset}
                    className="mb-8 inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-white/50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                  </button>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Describe Your Project
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Tell us what you need and we'll match you with the perfect freelancer in minutes
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Form Section */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                    <MissionForm
                      onMissionGenerated={handleMissionGenerated}
                      onLoadingChange={handleLoadingChange}
                      onError={handleError}
                    />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                      <div className="flex items-start space-x-3">
                        <div className="text-red-500 mt-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-red-800 font-semibold mb-1">Project Analysis Failed</h3>
                          <p className="text-red-700 text-sm mb-3">{error}</p>
                          <button
                            onClick={handleReset}
                            className="text-red-600 hover:text-red-800 underline text-sm font-medium"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results Section */}
                <div className="lg:sticky lg:top-24">
                  {(isLoading || mission) && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden">
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
