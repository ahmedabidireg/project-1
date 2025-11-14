import React from 'react';
import TruckCard from './TruckCard';
import { Loader2, MapPin, AlertCircle } from 'lucide-react';

const TruckList = ({
  trucks,
  userLocation,
  selectedTruck,
  onSelectTruck,
  isLoadingLocation,
  isDefaultLocation,
}) => {
  if (isLoadingLocation) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-gray-200 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-700 font-semibold text-lg">Détection de votre position...</p>
        <p className="text-gray-500 text-sm mt-2">Veuillez patienter</p>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-yellow-200">
        <div className="flex items-center gap-3 text-yellow-600 mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">
            Position non disponible
          </h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Veuillez autoriser l'accès à votre position pour voir les distances et trier les camions par proximité.
        </p>
      </div>
    );
  }

  if (trucks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-gray-200 text-center">
        <p className="text-gray-500 text-lg font-medium">Aucun camion disponible</p>
      </div>
    );
  }

  return (
    <div>
      <div className={`mb-8 p-4 rounded-xl border-2 shadow-sm ${
        isDefaultLocation 
          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isDefaultLocation ? 'bg-yellow-600' : 'bg-blue-600'
          }`}>
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              {isDefaultLocation ? 'Position par défaut' : 'Votre position'}
            </p>
            <p className="text-sm font-bold text-gray-800">
              {isDefaultLocation ? 'Regueb, Sidi Bouzid' : `${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`}
            </p>
            {isDefaultLocation && (
              <p className="text-xs text-gray-600 mt-1">
                Géolocalisation indisponible - Utilisation de la position par défaut
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {trucks.map((truck) => (
          <TruckCard
            key={truck.id}
            truck={truck}
            distance={truck.distance}
            onSelect={onSelectTruck}
            isSelected={selectedTruck?.id === truck.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TruckList;

