"use client";

import React, { useState } from 'react';
import { Mission } from '@/types/mission';

interface MissionResultProps {
  mission: Mission | null;
  isLoading: boolean;
  onReset: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function MissionResult({ mission, isLoading, onReset }: MissionResultProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    if (!mission) return;

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Mission/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mission),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving mission:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    if (!mission) return;

    const exportData = {
      ...mission,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mission-${mission.title?.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}k€`;
    }
    return `${amount}€`;
  };

  const getWorkModeIcon = (mode: string) => {
    switch (mode) {
      case 'REMOTE':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
          </svg>
        );
      case 'ONSITE':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'HYBRID':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-center space-y-6">
          {/* AI Animation */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-600 animate-ping"></div>
            <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">AI is Creating Your Mission</h3>
            <p className="text-gray-600">Analyzing requirements and generating detailed specifications...</p>
          </div>

          {/* Loading skeleton */}
          <div className="space-y-4 text-left">
            <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded-lg animate-pulse w-full"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mission) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 text-sm font-medium">Mission Generated Successfully</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{mission.title}</h2>
          </div>
          
          <button
            onClick={onReset}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
          >
            Create New
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{formatCurrency(mission.estimatedDailyRate)}</div>
            <div className="text-gray-600 text-sm">Daily Rate</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{mission.duration}</div>
            <div className="text-gray-600 text-sm capitalize">{mission.durationType}s</div>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center flex flex-col items-center">
            <div className="text-indigo-600 mb-1">
              {getWorkModeIcon(mission.workMode)}
            </div>
            <div className="text-gray-600 text-sm capitalize">{mission.workMode.toLowerCase()}</div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-gray-900">{mission.city}</div>
            <div className="text-gray-600 text-sm">{mission.country}</div>
          </div>
        </div>
      </div>

      {/* Mission Details */}
      <div className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Mission Description
        </h3>
        
        <div className="prose max-w-none">
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-200">
            {mission.description}
          </div>
        </div>
      </div>

      {/* Technical Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 pt-0">
        {/* Skills & Expertise */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Required Skills
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {mission.requiredExpertises.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Project Info
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Domain:</span>
              <span className="text-gray-900 font-medium">{mission.domain}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Position:</span>
              <span className="text-gray-900 font-medium">{mission.position}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Experience:</span>
              <span className="text-gray-900 font-medium">{mission.experienceYear} years</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Contract:</span>
              <span className="text-gray-900 font-medium capitalize">{mission.contractType.toLowerCase()}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Start:</span>
              <span className="text-gray-900 font-medium">
                {mission.startImmediately ? 'Immediately' : mission.startDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : saveSuccess ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Saved!</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Save Mission</span>
            </>
          )}
        </button>
        
        <button
          onClick={handleExport}
          className="flex-1 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export JSON</span>
        </button>
      </div>
    </div>
  );
}
