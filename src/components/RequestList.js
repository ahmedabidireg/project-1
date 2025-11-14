import React from 'react';
import { Phone, X, MapPin, Clock, User, Car, Truck, AlertTriangle } from 'lucide-react';
import { calculateDistance } from '../utils/haversine';

const RequestList = ({ requests, trucks, userLocation, onCall, onCancel }) => {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-gray-200 text-center">
        <div className="max-w-md mx-auto">
          <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune demande active</h3>
          <p className="text-gray-500 text-sm">
            Vos demandes d'assistance apparaîtront ici une fois créées
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
            Demandes actives
          </h2>
          <p className="text-gray-600 text-sm">
            {requests.length} {requests.length > 1 ? 'demandes' : 'demande'} en cours
          </p>
        </div>
        <div className="px-4 py-2 bg-blue-100 rounded-full">
          <span className="text-blue-700 font-bold text-lg">{requests.length}</span>
        </div>
      </div>
      {requests.map((request) => {
        const distance = userLocation
          ? calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              request.truckLatitude,
              request.truckLongitude
            )
          : null;

        return (
          <div
            key={request.id}
            className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-800">
                      {request.truckName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(request.createdAt).toLocaleString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Informations du camion */}
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <div className="p-1.5 bg-blue-600 rounded-lg">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-600 uppercase">Camion</span>
                      <p className="text-sm font-bold text-gray-800">{request.truckPhone}</p>
                    </div>
                  </div>
                  {distance !== null && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">Distance : {distance} km</span>
                    </div>
                  )}
                </div>

                {/* Informations de l'utilisateur */}
                <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <div className="p-1.5 bg-green-600 rounded-lg">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-600 uppercase">Demandeur</span>
                      <p className="text-sm font-bold text-gray-800">{request.userName || 'Non renseigné'}</p>
                    </div>
                  </div>
                  {request.userPhone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{request.userPhone}</span>
                    </div>
                  )}
                  {request.carModel && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Car className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{request.carModel}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {request.note && (
              <div className="mb-5 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Note</p>
                <p className="text-sm text-gray-700 leading-relaxed">{request.note}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
              <a
                href={`tel:${request.truckPhone}`}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3.5 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                onClick={() => onCall && onCall(request)}
              >
                <Phone className="w-5 h-5" />
                Appeler
              </a>
              <button
                onClick={() => onCancel(request.id)}
                className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <X className="w-5 h-5" />
                Annuler
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestList;

