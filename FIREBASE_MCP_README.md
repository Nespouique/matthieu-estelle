# Configuration MCP Firebase

Ce projet est configuré avec le MCP (Model Context Protocol) Firebase pour une intégration facile avec les services Firebase.

## Configuration requise

1. **Installer Firebase CLI** (déjà fait) :
   ```bash
   npm install -g firebase-tools
   ```

2. **Se connecter à Firebase** :
   ```bash
   firebase login
   ```

3. **Créer un projet Firebase** :
   ```bash
   firebase projects:create your-project-id
   ```

4. **Configurer le projet** :
   ```bash
   firebase use your-project-id
   ```

## Fichiers de configuration

- `.firebaserc` - Configuration du projet Firebase
- `firebase.json` - Configuration des services Firebase
- `firestore.rules` - Règles de sécurité Firestore
- `firestore.indexes.json` - Index Firestore
- `storage.rules` - Règles de sécurité Storage
- `.mcp/firebase-config.json` - Configuration MCP

## Services configurés

### Firestore
Collections prêtes :
- `rsvps` - Réponses des invités
- `memories` - Livre d'or/souvenirs
- `contacts` - Messages de contact
- `analytics` - Données d'analytics

### Storage
Buckets configurés :
- `memories-photos` - Photos des souvenirs
- `wedding-assets` - Assets du mariage

### Hosting
- Configuré pour déployer le build Vite vers Firebase Hosting
- SPA routing configuré

## Utilisation avec MCP

Le serveur MCP Firebase est configuré pour :
- Gérer les collections Firestore
- Uploader des fichiers vers Storage
- Gérer l'authentification
- Déployer sur Hosting

## Commandes utiles

```bash
# Démarrer les émulateurs locaux
firebase emulators:start

# Déployer les règles uniquement
firebase deploy --only firestore:rules,storage

# Déployer l'application complète
firebase deploy

# Initialiser MCP Firebase
firebase mcp
```

## Prochaines étapes

1. Remplacer "your-project-id" par votre vrai ID de projet
2. Configurer les clés API dans `src/lib/firebase.js`
3. Ajuster les règles de sécurité selon vos besoins
4. Tester avec les émulateurs Firebase

## Structure des données

### RSVP
```json
{
  "email": "guest@example.com",
  "name": "Nom de l'invité",
  "attendance": "yes|no|maybe",
  "guests": 2,
  "dietary": "Restrictions alimentaires",
  "message": "Message personnel",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Memory
```json
{
  "name": "Nom de l'auteur",
  "message": "Message de souvenir",
  "imageUrl": "URL de l'image (optionnel)",
  "approved": false,
  "createdAt": "timestamp"
}
```