import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase';

// Créer un nom de dossier sûr à partir du nom de la personne
const createSafeFolderName = (name) => {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '_') // Remplacer les espaces par des underscores
    .substring(0, 50); // Limiter la longueur
};

// Obtenir la date actuelle au format YYYY_MM_DD
const getCurrentDateString = () => {
  const now = new Date();
  const parisDate = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Paris"}));
  
  const year = parisDate.getFullYear();
  const month = String(parisDate.getMonth() + 1).padStart(2, '0');
  const day = String(parisDate.getDate()).padStart(2, '0');
  
  return `${year}_${month}_${day}`;
};

// Valider le type de fichier
const isValidFileType = (file) => {
  const validTypes = [
    // Images
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
    'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml',
    // Vidéos
    'video/mp4', 'video/webm', 'video/mov', 'video/quicktime', 'video/avi',
    'video/mkv', 'video/wmv', 'video/flv', 'video/3gp',
    // Audio
    'audio/webm', 'audio/ogg', 'audio/mp3', 'audio/mpeg', 'audio/mp4',
    'audio/aac', 'audio/wav', 'audio/flac', 'audio/m4a',
    // Texte
    'text/plain'
  ];
  
  return validTypes.includes(file.type) || file.type.startsWith('image/') || 
         file.type.startsWith('video/') || file.type.startsWith('audio/');
};

// Valider la taille du fichier (100 Mo max)
const isValidFileSize = (file) => {
  const maxSize = 100 * 1024 * 1024; // 100 Mo en bytes
  return file.size <= maxSize;
};

// Service d'upload des souvenirs
export const memoriesUploadService = {
  // Uploader un ou plusieurs fichiers
  async uploadMemories(files, name, message = '') {
    try {
      // Valider le nombre de fichiers (max 10)
      if (files.length > 10) {
        throw new Error('Maximum 10 fichiers autorisés par envoi');
      }

      if (!name || name.trim() === '') {
        throw new Error('Le nom est obligatoire');
      }

      // Créer un nom de dossier unique pour cet upload
      const safeName = createSafeFolderName(name);
      const dateString = getCurrentDateString();
      const folderName = `${safeName}_${dateString}`;

      console.log('Upload debug - folderName:', folderName);
      console.log('Upload debug - safeName:', safeName);
      console.log('Upload debug - dateString:', dateString);

      // Upload de tous les fichiers dans le dossier
      const uploadPromises = Array.from(files).map(file => 
        this.uploadSingleFileToFolder(file, folderName)
      );

      console.log('Upload debug - uploading files...');
      const results = await Promise.all(uploadPromises);
      console.log('Upload debug - files uploaded:', results.length);

      // Créer le fichier message.txt avec juste le message/anecdote
      const messageContent = message.trim();

      // Upload du fichier message.txt
      const messagePath = `souvenirs/${folderName}/message.txt`;
      console.log('Upload debug - message path:', messagePath);
      const messageRef = ref(storage, messagePath);
      const messageFile = new Blob([messageContent], { type: 'text/plain' });
      
      console.log('Upload debug - uploading message...');
      try {
        await uploadBytes(messageRef, messageFile);
        console.log('Upload debug - message uploaded successfully');
      } catch (messageError) {
        console.error('Upload debug - message upload failed:', messageError);
        throw new Error(`Erreur lors de l'upload du message: ${messageError.message}`);
      }
      
      return {
        success: true,
        folderName: folderName,
        filesUploaded: results.length,
        results: results
      };
    } catch (error) {
      console.error('Upload debug - general error:', error);
      throw new Error(`Erreur lors de l'upload des souvenirs: ${error.message}`);
    }
  },

  // Uploader un fichier unique dans un dossier spécifique
  async uploadSingleFileToFolder(file, folderName) {
    try {
      // Valider le fichier
      if (!isValidFileType(file)) {
        throw new Error(`Type de fichier non supporté: ${file.type}`);
      }

      if (!isValidFileSize(file)) {
        throw new Error('Fichier trop volumineux (max 100 Mo)');
      }

      // Construire le chemin avec le nom original du fichier
      const fullPath = `souvenirs/${folderName}/${file.name}`;

      // Créer la référence Firebase Storage
      const storageRef = ref(storage, fullPath);

      // Upload du fichier sans métadonnées individuelles
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type
      });
      
      // Vérifier que l'upload est bien terminé
      if (!snapshot.metadata) {
        throw new Error('Upload incomplet - métadonnées manquantes');
      }

      // Retourner les informations de l'upload
      return {
        success: true,
        path: fullPath,
        originalFilename: file.name,
        size: file.size,
        type: file.type
      };

    } catch (error) {
      throw new Error(`Erreur lors de l'upload de ${file.name}: ${error.message}`);
    }
  },

  // Valider les fichiers avant upload
  validateFiles(files) {
    const errors = [];
    
    if (files.length === 0) {
      errors.push('Aucun fichier sélectionné');
      return errors;
    }

    if (files.length > 10) {
      errors.push('Maximum 10 fichiers autorisés par envoi');
    }

    Array.from(files).forEach((file, index) => {
      if (!isValidFileType(file)) {
        errors.push(`Fichier ${index + 1}: Type non supporté (${file.type})`);
      }
      
      if (!isValidFileSize(file)) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        errors.push(`Fichier ${index + 1}: Trop volumineux (${sizeMB} Mo, max 100 Mo)`);
      }
    });

    return errors;
  },

  // Obtenir les types de fichiers acceptés pour l'input
  getAcceptedTypes() {
    return 'image/*,video/*,audio/*,text/plain';
  }
};