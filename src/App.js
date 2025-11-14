import React, { useState, useEffect } from 'react';
import { AlertTriangle, Truck } from 'lucide-react';
import TruckList from './components/TruckList';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';
import Modal from './components/Modal';
import { initialTrucks } from './data/trucks';
import { getRequests, saveRequest, deleteRequest } from './utils/storage';
import { calculateDistance } from './utils/haversine';

function App() {
  const [trucks, setTrucks] = useState(initialTrucks);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isDefaultLocation, setIsDefaultLocation] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('trucks'); // 'trucks' or 'requests'

  // Position par défaut : Regueb, Sidi Bouzid, Tunisie
  const DEFAULT_LOCATION = {
    latitude: 35.0333,
    longitude: 9.4833, // Regueb, Sidi Bouzid
  };

  // Détection de la position de l'utilisateur
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          // Utiliser Regueb, Sidi Bouzid comme position par défaut
          setUserLocation(DEFAULT_LOCATION);
          setIsDefaultLocation(true);
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      // Géolocalisation non supportée, utiliser la position par défaut
      setUserLocation(DEFAULT_LOCATION);
      setIsDefaultLocation(true);
      setIsLoadingLocation(false);
    }
  }, []);

  // Calcul des distances et tri des camions
  useEffect(() => {
    if (userLocation) {
      const trucksWithDistance = trucks.map((truck) => ({
        ...truck,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          truck.latitude,
          truck.longitude
        ),
      }));

      // Trier par distance (du plus proche au plus loin)
      trucksWithDistance.sort((a, b) => a.distance - b.distance);

      setTrucks(trucksWithDistance);
    }
  }, [userLocation]);

  // Charger les demandes depuis le localStorage
  useEffect(() => {
    setRequests(getRequests());
  }, []);

  const handleSelectTruck = (truck) => {
    setSelectedTruck(truck);
  };

  const handleSubmitRequest = (requestData) => {
    try {
      const newRequest = saveRequest(requestData);
      setRequests([...requests, newRequest]);
      setSelectedTruck(null);
      setActiveTab('requests');
    } catch (error) {
      alert('Erreur lors de la sauvegarde de la demande');
    }
  };

  const handleCloseModal = () => {
    setSelectedTruck(null);
  };

  const handleCancelRequest = (requestId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette demande ?')) {
      try {
        deleteRequest(requestId);
        setRequests(requests.filter((req) => req.id !== requestId));
      } catch (error) {
        alert('Erreur lors de la suppression de la demande');
      }
    }
  };

  const handleCall = (request) => {
    // L'action d'appel est gérée par le lien tel:
    console.log('Appel vers:', request.truckPhone);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-2.5 sm:p-3.5 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  SOS Trucks
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Assistance routière 24/7</p>
              </div>
            </div>
            {userLocation && (
              <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-700">Position détectée</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('trucks');
              setSelectedTruck(null);
            }}
            className={`px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md whitespace-nowrap ${
              activeTab === 'trucks'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-300 transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg'
            }`}
          >
            <Truck className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'trucks' ? 'text-white' : 'text-blue-600'}`} />
            <span className="text-sm sm:text-base">Camions</span>
            {activeTab === 'trucks' && trucks.length > 0 && (
              <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                {trucks.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md whitespace-nowrap ${
              activeTab === 'requests'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-300 transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'requests' ? 'text-white' : 'text-red-600'}`} />
            <span className="text-sm sm:text-base">Demandes</span>
            {requests.length > 0 && (
              <span className={`ml-1 sm:ml-2 px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'requests' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {requests.length}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'trucks' && (
            <TruckList
              trucks={trucks}
              userLocation={userLocation}
              selectedTruck={selectedTruck}
              onSelectTruck={handleSelectTruck}
              isLoadingLocation={isLoadingLocation}
              isDefaultLocation={isDefaultLocation}
            />
          )}

          {activeTab === 'requests' && (
            <RequestList
              requests={requests}
              trucks={trucks}
              userLocation={userLocation}
              onCall={handleCall}
              onCancel={handleCancelRequest}
            />
          )}
        </div>
      </div>

      {/* Modal pour le formulaire */}
      <Modal
        isOpen={!!selectedTruck}
        onClose={handleCloseModal}
        title="Demander de l'assistance"
      >
        <RequestForm
          selectedTruck={selectedTruck}
          userLocation={userLocation}
          onSubmit={handleSubmitRequest}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 text-sm font-medium">
            © 2024 SOS Trucks - Service d'assistance routière professionnel
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Disponible 24h/24 et 7j/7 pour votre sécurité
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
