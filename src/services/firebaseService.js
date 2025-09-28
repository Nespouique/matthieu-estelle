import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

// Service pour les RSVP
export const rsvpService = {
  // Ajouter une réponse RSVP
  async addRSVP(rsvpData) {
    try {
      const docRef = await addDoc(collection(db, 'rsvps'), {
        ...rsvpData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour un RSVP
  async updateRSVP(rsvpId, updateData) {
    try {
      await updateDoc(doc(db, 'rsvps', rsvpId), {
        ...updateData,
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  },

  // Récupérer tous les RSVP
  async getAllRSVPs() {
    try {
      const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Rechercher un RSVP par email
  async getRSVPByEmail(email) {
    try {
      const q = query(collection(db, 'rsvps'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
};

// Service pour le livre d'or (memories)
export const memoriesService = {
  // Ajouter un souvenir
  async addMemory(memoryData) {
    try {
      const docRef = await addDoc(collection(db, 'memories'), {
        ...memoryData,
        createdAt: new Date(),
        approved: false // Nécessite une approbation par défaut
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les souvenirs approuvés
  async getApprovedMemories() {
    try {
      const q = query(
        collection(db, 'memories'), 
        where('approved', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Écouter les souvenirs en temps réel
  onMemoriesChange(callback) {
    const q = query(
      collection(db, 'memories'),
      where('approved', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const memories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(memories);
    });
  },

  // Uploader une image pour un souvenir
  async uploadMemoryImage(file, memoryId) {
    try {
      const storageRef = ref(storage, `memories/${memoryId}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw error;
    }
  }
};

// Service pour les messages de contact
export const contactService = {
  // Ajouter un message de contact
  async addContactMessage(messageData) {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...messageData,
        createdAt: new Date(),
        read: false
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  }
};

// Service d'analytics pour suivre les visites
export const analyticsService = {
  // Enregistrer une visite de page
  async trackPageView(pageData) {
    try {
      await addDoc(collection(db, 'analytics'), {
        ...pageData,
        timestamp: new Date(),
        userAgent: navigator.userAgent
      });
    } catch (error) {
      // Ne pas faire échouer l'app si le tracking échoue
    }
  }
};