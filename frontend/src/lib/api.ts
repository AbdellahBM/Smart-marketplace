import { Mission, MissionFormData, GenerateMissionRequest, ApiResponse } from '@/types/mission';

// Configuration de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Generic API error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Extract error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
}

// Client API principal
class MissionApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Méthode générique pour les requêtes
  public async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.text();
          if (errorData) {
            errorMessage = errorData;
          }
        } catch {
          // If we can't parse the error response, use the default message
        }
        
        throw new ApiError(errorMessage, response.status, response);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  // Générer une mission
  async generateMission(formData: MissionFormData): Promise<Mission> {
    const requestData: GenerateMissionRequest = {
      simpleInput: formData.description,
      preferredProvider: formData.preferredProvider
    };

    const response = await this.request<ApiResponse<Mission>>('/api/Mission/generate', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });

    if (!response.success || !response.data) {
      throw new ApiError(
        response.errorMessage || 'Failed to generate mission'
      );
    }

    return response.data;
  }

  // Sauvegarder une mission
  async saveMission(mission: Mission): Promise<Mission> {
    const response = await this.request<ApiResponse<Mission>>('/api/Mission/save', {
      method: 'POST',
      body: JSON.stringify(mission),
    });

    if (!response.success || !response.data) {
      throw new ApiError(
        response.errorMessage || 'Failed to save mission'
      );
    }

    return response.data;
  }
}

// Instance singleton du client API
const apiClient = new MissionApiClient();

// Fonctions exportées pour l'utilisation dans les composants
export async function generateMission(formData: MissionFormData): Promise<Mission> {
  return apiClient.generateMission(formData);
}

export async function saveMission(mission: Mission): Promise<Mission> {
  return apiClient.saveMission(mission);
}

// Hook personnalisé pour la génération de mission
export function useMissionGenerator() {
  const generate = async (description: string): Promise<Mission> => {
    return generateMission({ description });
  };

  return { generate };
}

// Utilitaires pour la gestion des erreurs
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Get all missions
 */
export async function getAllMissions(): Promise<Mission[]> {
  const response = await apiClient.request<ApiResponse<Mission[]>>('/api/Mission');

  if (!response.success || !response.data) {
    throw new ApiError(response.errorMessage || 'Failed to fetch missions');
  }

  return response.data;
}

/**
 * Get a mission by ID
 */
export async function getMissionById(id: string): Promise<Mission> {
  const response = await apiClient.request<ApiResponse<Mission>>(`/api/Mission/${id}`);

  if (!response.success || !response.data) {
    throw new ApiError(response.errorMessage || 'Mission not found');
  }

  return response.data;
}

/**
 * Delete a mission
 */
export async function deleteMission(id: string): Promise<boolean> {
  const response = await apiClient.request<ApiResponse<boolean>>(`/api/Mission/${id}`, {
    method: 'DELETE',
  });

  if (!response.success) {
    throw new ApiError(response.errorMessage || 'Failed to delete mission');
  }

  return response.data || false;
}

/**
 * Check AI provider status
 */
export async function getAIProviderStatus(): Promise<Record<string, boolean>> {
  const response = await apiClient.request<ApiResponse<Record<string, boolean>>>('/api/Mission/ai-status');

  if (!response.success || !response.data) {
    throw new ApiError(response.errorMessage || 'Failed to get AI status');
  }

  return response.data;
}

/**
 * Utility function to check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Utility function to get the API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
