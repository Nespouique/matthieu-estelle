# 🎉 Application de Mariage - Estelle & Matthieu

## 📋 Résumé du déploiement

Votre application de mariage est maintenant prête pour le déploiement sur votre serveur Proxmox ! 

### 📦 Fichiers créés pour le déploiement

1. **`Dockerfile`** - Configuration Docker optimisée pour la production
2. **`nginx.conf`** - Configuration Nginx avec compression et optimisations
3. **`docker-compose.yml`** - Configuration Docker Compose
4. **`export-image.ps1`** - Script PowerShell pour exporter l'image Docker
5. **`deploy-proxmox.sh`** - Script de déploiement automatisé pour le serveur
6. **`estelle-matthieu-wedding.tar`** - Image Docker exportée (50 MB)
7. **`DEPLOYMENT.md`** - Guide complet de déploiement

## 🚀 Prochaines étapes

### Sur Windows (terminé ✅)

1. ✅ Construction de l'image Docker
2. ✅ Test local réussi
3. ✅ Export de l'image vers fichier tar

### Sur votre serveur Proxmox

1. **Transférer le fichier tar** vers votre serveur
   ```powershell
   scp estelle-matthieu-wedding.tar user@your-server-ip:/home/user/
   ```

2. **Transférer le script de déploiement**
   ```powershell
   scp deploy-proxmox.sh user@your-server-ip:/home/user/
   ```

3. **Se connecter au serveur et déployer**
   ```bash
   ssh user@your-server-ip
   chmod +x deploy-proxmox.sh
   ./deploy-proxmox.sh
   ```

## 🎯 Caractéristiques techniques

- **Framework**: React + Vite
- **Serveur web**: Nginx (Alpine Linux)
- **Taille de l'image**: ~50 MB
- **Port**: 80 (HTTP)
- **Architecture**: Multi-stage Docker build pour optimisation

## 🔧 Configuration automatique

Le script de déploiement configure automatiquement :
- ✅ Installation de Docker si nécessaire
- ✅ Chargement de l'image Docker
- ✅ Lancement du conteneur avec restart automatique
- ✅ Configuration optionnelle du reverse proxy Nginx
- ✅ Configuration HTTPS avec Let's Encrypt (optionnel)

## 📱 Fonctionnalités de l'application

- Interface bilingue (Français/Anglais)
- Formulaire RSVP
- Livre d'or pour les invités
- Informations pratiques (lieu, transport, hébergement)
- Planning du mariage
- Galerie de souvenirs
- Interface responsive (mobile/desktop)

## 🛡️ Sécurité et performance

- Image Docker optimisée et sécurisée
- Compression gzip activée
- Headers de sécurité configurés
- Mise en cache des assets statiques
- Firewall configuré automatiquement

## 📞 Support

Consultez le fichier `DEPLOYMENT.md` pour :
- Instructions détaillées de déploiement
- Guide de dépannage
- Commandes de maintenance
- Configuration HTTPS
- Monitoring et surveillance

---

**Bon déploiement ! 🎊**
