const STORAGE_KEY = 'sos_requests';

/**
 * Récupère toutes les demandes depuis le localStorage
 */
export function getRequests() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes:', error);
    return [];
  }
}

/**
 * Sauvegarde une nouvelle demande dans le localStorage
 */
export function saveRequest(request) {
  try {
    const requests = getRequests();
    const newRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    requests.push(newRequest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return newRequest;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la demande:', error);
    throw error;
  }
}

/**
 * Supprime une demande du localStorage
 */
export function deleteRequest(requestId) {
  try {
    const requests = getRequests();
    const filtered = requests.filter((req) => req.id !== requestId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erreur lors de la suppression de la demande:', error);
    throw error;
  }
}

