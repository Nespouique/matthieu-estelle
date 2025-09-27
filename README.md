# 🎉 Site de Mariage - Estelle & Matthieu

Site de mariage bilingue élégant et moderne, construit avec React et Vite, optimisé pour le déploiement Docker sur Proxmox.

## 🚀 Déploiement Rapide avec Portainer

### 📦 Prêt à déployer

L'application est déjà **construite et empaquetée** dans une image Docker optimisée (50 MB). Pas besoin de compiler !

**Fichiers essentiels :**
- ✅ `estelle-matthieu-wedding.tar` - Image Docker prête
- ✅ `docker-compose.portainer.yml` - Configuration Portainer
- ✅ Ce README - Guide complet

### ⚡ Déploiement en 3 étapes

```bash
# 1. Transférer l'image sur votre serveur Proxmox
scp estelle-matthieu-wedding.tar user@your-server-ip:/home/user/

# 2. Charger l'image Docker
ssh user@your-server-ip
docker load -i estelle-matthieu-wedding.tar

# 3. Déployer via Portainer (Interface Web)
# ➜ Accéder à http://your-server-ip:9000
# ➜ Stacks → Add Stack → Coller la config → Deploy
```

## 🎯 Fonctionnalités

- ✅ **Bilingue** - Français/Anglais avec commutation instantanée
- ✅ **RSVP interactif** - Formulaire avec gestion des accompagnants
- ✅ **Livre d'or** - Messages des invités
- ✅ **Informations complètes** - Programme, lieu, transport, hébergement
- ✅ **Responsive** - Optimisé mobile/tablette/desktop
- ✅ **Production-ready** - Nginx + optimisations performances

## 🐳 Configuration Docker

### Image multi-stage optimisée
```dockerfile
# Build stage (Node.js) → Production stage (Nginx Alpine)
# Taille finale : ~48 MB
```

### Configuration Portainer
```yaml
version: '3.8'
services:
  wedding-app:
    image: estelle-matthieu-wedding:latest
    container_name: estelle-matthieu-wedding
    restart: unless-stopped
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - wedding-network

networks:
  wedding-network:
    driver: bridge
```

## 🔧 Déploiement via Portainer

### Accès à Portainer
1. **Interface** : `http://your-server-ip:9000`
2. **Stacks** → **Add Stack**
3. **Nom** : `wedding-app`
4. **Configuration** : Copier le contenu de `docker-compose.portainer.yml`
5. **Deploy** : Un clic !

### Gestion via Portainer
- 🖱️ **Interface graphique** intuitive
- 📊 **Monitoring** en temps réel
- 📝 **Logs** centralisés
- 🔄 **Start/Stop/Restart** facile
- ⚙️ **Configuration** modifiable
- 📈 **Métriques** CPU/RAM
## 🛠️ Développement Local

Si vous voulez modifier l'application :

```bash
# Installation
npm install

# Développement
npm run dev
# ➜ http://localhost:5173

# Construction
npm run build

# Test Docker local
docker build -t estelle-matthieu-wedding .
docker run -d -p 8080:80 estelle-matthieu-wedding
# ➜ http://localhost:8080
```

## 📦 Construction et Publication de l'Image Docker

### Prérequis
- **Docker Desktop** : Lancer Docker Desktop en local

### 🛠️ Processus de build et publication

```bash
# 1. Construction de l'image
docker build -t nespouique/estelle-matthieu-wedding:latest .

# 2. Ajouter un tag de version
docker tag nespouique/estelle-matthieu-wedding:latest nespouique/estelle-matthieu-wedding:v2.2.0

# 3. Publication sur Docker Hub
docker push nespouique/estelle-matthieu-wedding:v2.2.0
docker push nespouique/estelle-matthieu-wedding:latest
```

### 📋 Étapes détaillées

1. **Lancer Docker Desktop** - S'assurer que Docker est démarré
2. **Build** - Construire l'image avec le tag latest
3. **Tag** - Ajouter un tag de version spécifique (ex: v2.2.0)
4. **Push** - Publier les deux versions (latest et versionnée) sur Docker Hub

## 📦 Mise à jour

```bash
# 1. Modifier le code
# 2. Reconstruire l'image
docker build -t estelle-matthieu-wedding .
docker save -o estelle-matthieu-wedding-v2.tar estelle-matthieu-wedding

# 3. Transférer et charger
scp estelle-matthieu-wedding-v2.tar user@server:/home/user/
ssh user@server "docker load -i estelle-matthieu-wedding-v2.tar"

# 4. Redéployer via Portainer
# Stacks → wedding-app → Update → Re-deploy
```

### Commandes utiles
```bash
# Vérifier le statut
docker ps | grep wedding

# Voir les logs
docker logs estelle-matthieu-wedding

# Statistiques en temps réel
docker stats estelle-matthieu-wedding

# Test de connectivité
curl -I http://your-server-ip
```

## 🆘 Dépannage

### Le conteneur ne démarre pas
1. **Portainer** → **Containers** → **Logs**
2. Vérifier les ports : `netstat -tulpn | grep :80`
3. Redémarrer : **Restart** dans Portainer

### Application inaccessible
1. **Firewall** : `sudo ufw allow 80/tcp`
2. **Port mapping** : Vérifier 80:80 dans la config
3. **Réseau** : `docker network ls`

### Performance lente
1. **Ressources** : Augmenter RAM/CPU du LXC
2. **Optimisation** : L'image est déjà optimisée (Nginx + gzip)
3. **Cache** : Headers de cache configurés

## ⚙️ Configuration Serveur Proxmox

### LXC Recommandé
- **OS** : Ubuntu 22.04 LTS
- **CPU** : 2 cores minimum
- **RAM** : 2 GB minimum
- **Stockage** : 20 GB
- **Réseau** : IP statique recommandée

### Installation Docker + Portainer
```bash
# Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Portainer
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data portainer/portainer-ce:latest
```

## 🔧 Technologies

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS + Radix UI
- **Production** : Nginx Alpine
- **Container** : Docker multi-stage
- **Orchestration** : Docker Compose + Portainer

## 📁 Structure du Projet

```
├── src/
│   ├── components/     # Composants React
│   │   ├── ui/        # Composants UI réutilisables
│   │   ├── rsvp/      # Formulaire RSVP
│   │   └── memories/  # Livre d'or
│   ├── contexts/      # Contextes React
│   ├── lib/          # Utilitaires et traductions
│   └── main.jsx      # Point d'entrée
├── Dockerfile        # Image multi-stage optimisée
├── nginx.conf        # Configuration Nginx
└── docker-compose.portainer.yml  # Config Portainer
```

## 🎮 Commandes Rapides

```bash
# Construction locale
npm run build

# Test Docker
docker build -t wedding . && docker run -p 8080:80 wedding

# Export pour serveur
docker save -o wedding.tar estelle-matthieu-wedding

# Déploiement serveur
scp wedding.tar user@server: && ssh user@server "docker load -i wedding.tar"
```

## 🔄 Sauvegarde et Restauration

### Sauvegarde
```bash
# Sauvegarder l'image
docker save estelle-matthieu-wedding > backup-wedding.tar

# Sauvegarder la configuration
cp docker-compose.portainer.yml backup/
```

### Restauration
```bash
# Restaurer l'image
docker load < backup-wedding.tar

# Redéployer via Portainer avec la configuration sauvegardée
```

## 🔐 Sécurité

### Recommandations
1. **Firewall** : Configurer ufw pour n'autoriser que les ports nécessaires
2. **Mise à jour** : Maintenir le système et Docker à jour
3. **Sauvegarde** : Sauvegarde automatique quotidienne
4. **Monitoring** : Surveillance des logs pour activités suspectes

### Configuration firewall
```bash
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 9000/tcp  # Portainer
sudo ufw enable
```

## 📞 Support et Contact

### En cas de problème
1. **Logs** : Vérifier les logs dans Portainer
2. **Statut** : Vérifier l'état des services Docker
3. **Réseau** : Tester la connectivité réseau
4. **Ressources** : Vérifier l'utilisation CPU/RAM

### Ressources utiles
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Portainer](https://docs.portainer.io/)
- [Guide Proxmox LXC](https://pve.proxmox.com/wiki/Linux_Container)

---

**🎉 Déploiement simplifié avec Portainer - Prêt en quelques clics !**

*Développé avec ❤️ pour Estelle & Matthieu*

---

**🎉 Déploiement simplifié avec Portainer - Prêt en quelques clics !**

*Développé avec ❤️ pour Estelle & Matthieu*
