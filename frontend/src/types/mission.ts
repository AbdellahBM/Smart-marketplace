export interface Mission {
  id?: string;
  title: string;
  description: string;
  country: string;
  city: string;
  workMode: 'ONSITE' | 'REMOTE' | 'HYBRID';
  duration: number;
  durationType: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  startImmediately: boolean;
  startDate?: string; // Format yyyy-MM-dd
  experienceYear: string; // "0-3", "3-7", "7-12", "12+"
  contractType: 'REGIE' | 'FORFAIT' | 'CDI' | 'CDD';
  estimatedDailyRate: number;
  domain: string;
  position: string;
  requiredExpertises: string[];
  createdAt?: string; // MODIFIÉ: ISO date format au lieu de Date
}

export interface MissionFormData {
  description: string;
  preferredProvider?: 'DeepSeek' | 'Gemini' | 'Mistral'; // MODIFIÉ: Nouveaux providers
}

// Types pour l'API Backend
export interface GenerateMissionRequest {
  simpleInput: string;
  preferredProvider?: 'DeepSeek' | 'Gemini' | 'Mistral'; // MODIFIÉ: Nouveaux providers
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  errorMessage: string | null;
  provider: string | null; // Provider IA utilisé
}
