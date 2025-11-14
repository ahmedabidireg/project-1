import React from 'react';
import { Phone, MapPin, CheckCircle, XCircle, Clock, Navigation, Calendar } from 'lucide-react';

const TruckCard = ({ truck, distance, onSelect, isSelected }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'available':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bg: 'bg-green-50', 
          borderColor: 'border-green-200',
          label: 'Disponible' 
        };
      case 'busy':
        return { 
          icon: Clock, 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-50', 
          borderColor: 'border-yellow-200',
          label: 'Occupé' 
        };
      case 'offline':
        return { 
          icon: XCircle, 
          color: 'text-gray-400', 
          bg: 'bg-gray-50', 
          borderColor: 'border-gray-200',
          label: 'Hors ligne' 
        };
      default:
        return { 
          icon: CheckCircle, 
          color: 'text-gray-600', 
          bg: 'bg-gray-50', 
          borderColor: 'border-gray-200',
          label: 'Inconnu' 
        };
    }
  };

  const statusInfo = getStatusInfo(truck.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div
      className={`group bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl ${
        isSelected
          ? 'border-blue-500 ring-4 ring-blue-200 shadow-blue-200'
          : `border-gray-200 hover:border-blue-400 ${statusInfo.borderColor}`
      } ${truck.status === 'offline' ? 'opacity-60' : ''}`}
    >
      {/* Image du camion */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
        <img
          src={truck.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'}
          alt={truck.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop';
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Badge de statut sur l'image */}
        <div className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${statusInfo.bg} border ${statusInfo.borderColor} shadow-md`}>
          <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
          <span className={`text-xs font-semibold ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Distance badge */}
        {distance !== null && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-600">{distance} km</span>
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
          {truck.name}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium break-all">{truck.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <div className="p-1.5 bg-gray-50 rounded-lg">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="break-all">
              {truck.latitude.toFixed(4)}, {truck.longitude.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Bouton Réserver */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => truck.status !== 'offline' && onSelect(truck)}
            disabled={truck.status === 'offline'}
            className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base ${
              truck.status === 'offline'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isSelected
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transform hover:scale-105'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105'
            }`}
          >
            {isSelected ? (
              <>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Camion sélectionné</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Réserver</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TruckCard;

