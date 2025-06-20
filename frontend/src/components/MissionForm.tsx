"use client";

import { useState } from 'react';
import { Mission } from '@/types/mission';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface MissionFormProps {
  onMissionGenerated: (mission: Mission) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: unknown) => void;
}

const AI_PROVIDERS = [
  { value: 'Gemini', label: 'Google Gemini', icon: '🧠', description: 'Fast & reliable' },
  { value: 'DeepSeek', label: 'DeepSeek R1', icon: '🔍', description: 'Advanced reasoning' },
  { value: 'Mistral', label: 'Mistral AI', icon: '🇫🇷', description: 'European AI' }
];

export default function MissionForm({ onMissionGenerated, onLoadingChange, onError }: MissionFormProps) {
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState('Gemini');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      onError('Please enter a mission description');
      return;
    }

    setIsSubmitting(true);
    onLoadingChange(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/Mission/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          simpleInput: input.trim(),
          preferredProvider: provider
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        onMissionGenerated(data.data);
      } else {
        throw new Error(data.message || 'Failed to generate mission');
      }
    } catch (error) {
      console.error('Error generating mission:', error);
      onError(error);
    } finally {
      setIsSubmitting(false);
      onLoadingChange(false);
    }
  };

  const handleExample = (example: string) => {
    setInput(example);
  };

  const examples = [
    "Full-stack developer React/Node.js Paris 5000€ remote 6 months senior",
    "Mobile app developer Flutter Casablanca 400$ hybrid 3 months",
    "Data scientist Python AI Rabat 600€ onsite 1 year expert"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">Describe Your Mission</h2>
        <p className="text-gray-600">
          Tell us what you need in simple terms - our AI will handle the rest
        </p>
      </div>

      {/* Quick Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Examples
        </h3>
        <div className="grid gap-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExample(example)}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 text-sm group"
            >
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:bg-blue-600"></div>
                <p>{example}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* AI Provider Selection */}
        <div className="space-y-3">
          <label className="text-gray-900 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Provider
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {AI_PROVIDERS.map((aiProvider) => (
              <button
                key={aiProvider.value}
                type="button"
                onClick={() => setProvider(aiProvider.value)}
                className={`bg-white border rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md ${
                  provider === aiProvider.value 
                    ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{aiProvider.icon}</span>
                  <div>
                    <div className="text-gray-900 font-medium text-sm">{aiProvider.label}</div>
                    <div className="text-gray-500 text-xs">{aiProvider.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mission Description */}
        <div className="space-y-3">
          <label htmlFor="mission-input" className="text-gray-900 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Mission Description
          </label>
          <div className="relative">
            <textarea
              id="mission-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Need a React developer for e-commerce website, Rabat, 4000DH, remote, 3 months, senior level"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-gray-900 placeholder-gray-400"
              rows={4}
              disabled={isSubmitting}
            />
            <div className="absolute bottom-3 right-3 text-gray-400 text-xs">
              {input.length}/500
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Include: technology, location, budget, work mode (remote/onsite/hybrid), duration, and experience level
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !input.trim()}
          className={`w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          } ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center justify-center space-x-3">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating mission...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Mission with AI</span>
              </>
            )}
          </div>
        </button>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
          <h4 className="text-gray-900 font-medium flex items-center text-sm">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro Tips
          </h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• Be specific about technologies (React, Node.js, Python, etc.)</li>
            <li>• Include your preferred location and work mode</li>
            <li>• Mention budget range and project duration</li>
            <li>• Specify experience level needed (junior/senior/expert)</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
