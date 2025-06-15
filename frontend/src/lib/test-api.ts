// Fonction utilitaire pour tester la connexion API
export async function testAPIConnection(): Promise<boolean> {
  try {
    const response = await fetch('/api/Mission/ai-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Test de connexion API échoué:', error);
    return false;
  }
}

// Fonction pour obtenir le statut des services IA
export async function getAIStatus(): Promise<Record<string, boolean> | null> {
  try {
    const response = await fetch('/api/Mission/ai-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.success ? data.mission : null;
  } catch (error) {
    console.error('Erreur lors de la récupération du statut IA:', error);
    return null;
  }
}
