export const venueEn = {
  venueTitle: "Logistics",
  introText: "Here you'll find all the essential information about travel, accommodation, and our wedding venues, so you can plan your stay with ease.",
  
  travelInfo: {
    title: "Arriving in France",
    description: "Whether you're arriving by plane or train, Paris is well connected and easy to reach. The main airports are Charles de Gaulle (CDG) and Orly (ORY). \n\nOur wedding venue is just about 20 minutes from CDG airport by car, making it a convenient option. Both airports offer taxis, rental services, and public transport into Paris. \n\nIf you're coming by train, Gare du Nord, Gare de Lyon, and Gare Montparnasse connect to many French and European cities. We recommend allowing extra time for travel in case of summer traffic and busy stations."
  },

  venues: {
    title: "Our Wedding Venues",
    townHall: {
      name: "Houilles Town Hall",
      address: "16 Rue Gambetta, 78800 Houilles",
      mapsLink: "https://maps.app.goo.gl/ooSaeYfedy7Ryn8m7",
      access: "Access from Paris:",
      parking: "Paid parking on site",
      transports: [
        {
          type: "RER",
          line: "A",
          logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Paris_transit_icons_-_RER_A.svg"
        },
        {
          type: "Transilien",
          line: "L or J",
          logos: [
            "https://upload.wikimedia.org/wikipedia/commons/8/81/Paris_transit_icons_-_Train_L.svg",
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Paris_transit_icons_-_Train_J.svg"
          ]
        }
      ]
    },
    home: {
      name: "Estelle and Matthieu's Home",
      address: "28 Boulevard Henri Barbusse, 78800 Houilles",
      mapsLink: "https://www.google.com/maps/place/28+Boulevard+Henri+Barbusse,+78800+Houilles",
      access: "Access from Paris:",
      parking: "Paid parking on site",
      transports: [
        {
          type: "RER",
          line: "A",
          logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Paris_transit_icons_-_RER_A.svg"
        },
        {
          type: "Transilien",
          line: "L or J",
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
      access: "Access from Paris: car via A1 highway, exit 7, direction Saint-Witz and Ermenonville",
      parking: "Free parking on site",
      transports: []
    }
  },

  accommodation: {
    title: "Accommodation",
    description: "We recommend staying in Paris or around the Domaine de Chaalis. Here are some options:",
    options: [
      { name: "Hotel Name 1", address: "Address 1", price: "Price 1" },
      { name: "Hotel Name 2", address: "Address 2", price: "Price 2" },
      { name: "Hotel Name 3", address: "Address 3", price: "Price 3" }
    ]
  },

  ourGuide: {
    title: "Our Guide",
    description: "We've put together a selection of our favorite spots and activities to help you make the most of your time. \n\nFrom charming cafes and restaurants to scenic walks and hidden gems, these are the places and experiences that we love. \n\nWe hope they make your stay extra special and give you a taste of the things we enjoy every day.",
    places: [
      {
        name: "Our first encounter",
        venue: "Le Comptoir Général",
        address: "84 Quai de Jemmapes, 75010 Paris",
        mapsLink: "https://maps.app.goo.gl/j3X4CK1vkTM9yPDc8",
        image: "/images/ComptoirGeneral.jpg"
      },
      {
        name: "Our first restaurant",
        venue: "McDonald's",
        address: "19 Place de la République, 75003 Paris",
        mapsLink: "https://maps.app.goo.gl/iUXvFYn9VUeHYfTz6",
        image: "/images/McDonalds.jpg"
      },
      {
        name: "Our first date location",
        venue: "Château de Chantilly",
        address: "Rue du Connétable, 60500 Chantilly",
        mapsLink: "https://maps.app.goo.gl/VJ1ZZfsG9h4CPpJF7",
        image: "/images/ChateauChantilly.jpg"
      }
    ]
  },

  viewOnMap: "Google Maps"
};