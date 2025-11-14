# SOS Trucks - Application d'Assistance Routière

Application web complète et responsive pour la gestion de camions d'assistance routière, développée avec React et TailwindCSS.

## 🚀 Fonctionnalités

- **Liste de camions SOS** avec informations détaillées :
  - Nom du camion
  - Numéro de téléphone
  - Statut (Disponible, Occupé, Hors ligne)
  - Coordonnées GPS (latitude/longitude)

- **Détection automatique de position** via l'API de géolocalisation du navigateur

- **Tri intelligent** des camions par distance (algorithme de Haversine)

- **Formulaire de demande d'assistance** :
  - Sélection d'un camion
  - Note descriptive du problème
  - Envoi de la demande

- **Gestion des demandes actives** :
  - Liste des demandes enregistrées dans le localStorage
  - Bouton d'appel direct vers le camion
  - Annulation de demande

- **Interface moderne et responsive** :
  - Design avec cartes, grilles et ombres
  - Coins arrondis et animations
  - Icônes Lucide React
  - Adapté mobile, tablette et desktop

## 🛠️ Technologies

- **React** 19.2.0
- **TailwindCSS** - Framework CSS utilitaire
- **Lucide React** - Bibliothèque d'icônes
- **localStorage** - Stockage local des données

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du projet

```
src/
├── components/
│   ├── TruckCard.js       # Carte d'affichage d'un camion
│   ├── TruckList.js       # Liste des camions disponibles
│   ├── RequestForm.js     # Formulaire de demande d'assistance
│   └── RequestList.js     # Liste des demandes actives
├── data/
│   └── trucks.js          # Données initiales des camions
├── utils/
│   ├── haversine.js       # Algorithme de calcul de distance
│   └── storage.js         # Gestion du localStorage
├── App.js                 # Composant principal
└── index.js               # Point d'entrée de l'application
```

## 📱 Utilisation

1. **Autoriser la géolocalisation** : L'application demande automatiquement l'accès à votre position pour calculer les distances.

2. **Consulter les camions** : La liste des camions est triée automatiquement du plus proche au plus loin.

3. **Créer une demande** :
   - Cliquez sur un camion disponible
   - Remplissez le formulaire avec une description du problème
   - Envoyez la demande

4. **Gérer vos demandes** : Consultez toutes vos demandes actives dans l'onglet "Mes demandes" et appelez directement ou annulez une demande.

## 🔒 Données

Les demandes sont stockées localement dans le navigateur via `localStorage`. Aucune donnée n'est envoyée à un serveur.

## 📝 Notes

- L'application fonctionne entièrement côté client, sans backend
- Les données des camions sont définies dans `src/data/trucks.js`
- Les demandes persistent entre les sessions grâce au localStorage

## 🎨 Personnalisation

Pour modifier les camions disponibles, éditez le fichier `src/data/trucks.js`.

Pour personnaliser le design, modifiez les classes TailwindCSS dans les composants.
