# 🎉 Site de Mariage - Estelle & Matthieu

## 🚀 Déploiement avec Portainer (Simplifié)

### 📦 Fichiers essentiels pour Portainer

Ce projet est configuré pour un déploiement facile avec **Portainer**. Vous n'avez besoin que de ces 3 fichiers :

1. **`estelle-matthieu-wedding.tar`** (50 MB) - Image Docker prête à déployer
2. **`docker-compose.portainer.yml`** - Configuration Portainer optimisée
3. **`PORTAINER-GUIDE.md`** - Guide de déploiement détaillé

### ⚡ Déploiement rapide

```bash
# 1. Transférer l'image sur votre serveur Proxmox
scp estelle-matthieu-wedding.tar user@your-server:/home/user/

# 2. Charger l'image Docker
ssh user@your-server
docker load -i estelle-matthieu-wedding.tar

# 3. Déployer via Portainer
# - Accéder à http://your-server:9000
# - Créer une nouvelle Stack
# - Copier le contenu de docker-compose.portainer.yml
# - Déployer en un clic !
```

### 🎯 Fonctionnalités

- ✅ Site bilingue (Français/Anglais)
- ✅ Formulaire RSVP interactif
- ✅ Livre d'or pour les invités
- ✅ Informations pratiques complètes
- ✅ Interface responsive
- ✅ Optimisé pour la production

### 🛠️ Développement local

Si vous voulez modifier l'application :

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Construction
npm run build

# Reconstruction de l'image Docker
docker build -t estelle-matthieu-wedding .
docker save -o estelle-matthieu-wedding.tar estelle-matthieu-wedding
```

### 📚 Documentation

- **`PORTAINER-GUIDE.md`** - Guide complet pour Portainer
- **`DEPLOYMENT.md`** - Guide général de déploiement
- **`docker-compose.portainer.yml`** - Configuration optimisée

---

**Déploiement simplifié avec Portainer ! 🐳**
