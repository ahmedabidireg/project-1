import React, { useState } from 'react';
import { Send, AlertCircle, User, Phone, Car, Truck } from 'lucide-react';

const RequestForm = ({ selectedTruck, userLocation, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedTruck) {
      setError('Veuillez sélectionner un camion');
      return;
    }

    if (!userLocation) {
      setError('Impossible de détecter votre position');
      return;
    }

    if (!name.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }

    if (!phone.trim()) {
      setError('Veuillez entrer votre numéro de téléphone');
      return;
    }

    if (!carModel.trim()) {
      setError('Veuillez entrer le modèle de votre voiture');
      return;
    }

    onSubmit({
      truckId: selectedTruck.id,
      truckName: selectedTruck.name,
      truckPhone: selectedTruck.phone,
      userName: name.trim(),
      userPhone: phone.trim(),
      carModel: carModel.trim(),
      note: note.trim(),
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
      truckLatitude: selectedTruck.latitude,
      truckLongitude: selectedTruck.longitude,
    });

    // Reset form
    setName('');
    setPhone('');
    setCarModel('');
    setNote('');
  };

  if (!selectedTruck) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Demander de l'assistance
        </h2>
        <p className="text-sm sm:text-base text-gray-600">Remplissez le formulaire ci-dessous pour envoyer votre demande</p>
      </div>

      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Camion sélectionné
            </p>
            <p className="text-lg font-bold text-gray-800">{selectedTruck.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span className="text-sm font-medium">{selectedTruck.phone}</span>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3 text-red-700 shadow-sm">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2.5"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Votre nom</span>
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              placeholder="Ex: Jean Dupont"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2.5"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Numéro de téléphone</span>
                <span className="text-red-500">*</span>
              </div>
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              placeholder="Ex: +216 98 123 456"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="carModel"
            className="block text-sm font-semibold text-gray-700 mb-2.5"
          >
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-600" />
              <span>Modèle de votre voiture</span>
              <span className="text-red-500">*</span>
            </div>
          </label>
          <input
            type="text"
            id="carModel"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
            placeholder="Ex: Peugeot 308, Renault Clio..."
            required
          />
        </div>

        <div>
          <label
            htmlFor="note"
            className="block text-sm font-semibold text-gray-700 mb-2.5"
          >
            Décrivez votre problème (optionnel)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all shadow-sm hover:shadow-md"
            placeholder="Ex: Panne de moteur sur l'autoroute A1, kilomètre 45..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Send className="w-5 h-5" />
            Envoyer la demande
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-md"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;

