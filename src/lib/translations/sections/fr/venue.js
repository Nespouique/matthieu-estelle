export const venueFr = {
  venueTitle: "Logistique",
  introText: "Vous trouverez ici toutes les informations essentielles sur le voyage, l'hébergement et nos lieux de célébration, afin de préparer votre séjour en toute sérénité.",
  
  travelInfo: {
    title: "Arrivée en France",
    description: "Que vous veniez en avion ou en train, Paris est bien desservie et facile d'accès. Les principaux aéroports sont Charles de Gaulle (CDG) et Orly (ORY).\n\nNotre lieu de réception se trouve à seulement 20 minutes en voiture de l'aéroport CDG, ce qui en fait une option pratique. Les deux aéroports proposent taxis, services de location de voiture et transports en commun vers la ville. \n\nSi vous arrivez en train, les gares du Nord, de Lyon et Montparnasse relient de nombreuses villes françaises et européennes. Nous vous conseillons de prévoir un peu de temps supplémentaire en raison de la circulation estivale et de l'affluence dans les gares."
  },

  venues: {
    title: "Lieux de Célébration",
    townHall: {
      name: "Mairie de Houilles",
      address: "16 Rue Gambetta, 78800 Houilles",
      mapsLink: "https://maps.app.goo.gl/ooSaeYfedy7Ryn8m7",
      access: "Accès depuis Paris :",
      parking: "Parking payant sur place",
      transports: [
        {
          type: "RER",
          line: "A",
          logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Paris_transit_icons_-_RER_A.svg"
        },
        {
          type: "Transilien",
          line: "L ou J",
          logos: [
            "https://upload.wikimedia.org/wikipedia/commons/8/81/Paris_transit_icons_-_Train_L.svg",
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Paris_transit_icons_-_Train_J.svg"
          ]
        }
      ]
    },
    home: {
      name: "Chez Estelle et Matthieu",
      address: "28 Boulevard Henri Barbusse, 78800 Houilles",
      mapsLink: "https://www.google.com/maps/place/28+Boulevard+Henri+Barbusse,+78800+Houilles",
      access: "Accès depuis Paris :",
      parking: "Parking payant sur place",
      transports: [
        {
          type: "RER",
          line: "A",
          logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Paris_transit_icons_-_RER_A.svg"
        },
        {
          type: "Transilien",
          line: "L ou J",
          logos: [
            "https://upload.wikimedia.org/wikipedia/commons/8/81/Paris_transit_icons_-_Train_L.svg",
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Paris_transit_icons_-_Train_J.svg"
          ]
        },
        {
          type: "Bus",
          line: "262",
          logo: null,
          busNumber: "262",
          busColor: "rgb(160, 0, 110)"
        }
      ]
    },
    chaalis: {
      name: "Domaine de Chaalis",
      address: "60300 Fontaine-Chaalis",
      mapsLink: "https://maps.app.goo.gl/kM2gLTWmGVwUGuab8",
      access: "Accès depuis Paris : voiture par l'autoroute A1, sortie n°7, direction Saint-Witz et Ermenonville",
      parking: "Parking gratuit sur place",
      transports: []
    }
  },

  accommodation: {
    title: "Hébergements",
    description: "Nous vous recommandons de loger à Paris ou bien autour du Domaine de Chaalis. Voici quelques options :",
    options: [
      { name: "Nom Hôtel 1", address: "Adresse 1", price: "Prix 1" },
      { name: "Nom Hôtel 2", address: "Adresse 2", price: "Prix 2" },
      { name: "Nom Hôtel 3", address: "Adresse 3", price: "Prix 3" }
    ]
  },

  ourGuide: {
    title: "Notre Guide",
    description: "Nous avons rassemblé une sélection de nos endroits et activités préférés pour vous aider à profiter pleinement de votre séjour. \n\nDes cafés et restaurants charmants aux promenades pittoresques et lieux cachés, ce sont des endroits et expériences que nous aimons particulièrement. \n\nNous espérons qu'ils rendront votre visite encore plus agréable et vous permettront de découvrir ce que nous apprécions au quotidien.",
    places: [
      {
        name: "Notre première rencontre",
        venue: "Le Comptoir Général",
        address: "84 Quai de Jemmapes, 75010 Paris",
        mapsLink: "https://maps.app.goo.gl/j3X4CK1vkTM9yPDc8",
        image: "/images/ComptoirGeneral.jpg"
      },
      {
        name: "Notre premier restaurant",
        venue: "McDonald's",
        address: "19 Place de la République, 75003 Paris",
        mapsLink: "https://maps.app.goo.gl/iUXvFYn9VUeHYfTz6",
        image: "/images/McDonalds.jpg"
      },
      {
        name: "Notre premier rendez-vous",
        venue: "Château de Chantilly",
        address: "Rue du Connétable, 60500 Chantilly",
        mapsLink: "https://maps.app.goo.gl/VJ1ZZfsG9h4CPpJF7",
        image: "/images/ChateauChantilly.jpg"
      }
    ]
  },

  viewOnMap: "Google Maps"
};