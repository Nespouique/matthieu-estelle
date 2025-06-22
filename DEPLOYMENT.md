# Guide de Déploiement - Application de Mariage

## 🐳 Déploiement avec Docker sur Proxmox

### Prérequis

- Serveur Proxmox avec un conteneur LXC (Ubuntu/Debian recommandé)
- Docker installé sur le conteneur LXC
- Accès SSH au serveur
- Port 80 (et éventuellement 443 pour HTTPS) disponible

### Étape 1 : Préparation sur Windows

1. **Construire l'image Docker :**
   ```powershell
   docker build -t estelle-matthieu-wedding .
   ```

2. **Exporter l'image :**
   ```powershell
   .\export-image.ps1
   ```
   
   Cela créera un fichier `estelle-matthieu-wedding.tar`

### Étape 2 : Transfert vers le serveur Proxmox

1. **Transférer le fichier via SCP :**
   ```powershell
   scp estelle-matthieu-wedding.tar user@your-server-ip:/home/user/
   ```

2. **Ou utiliser WinSCP/FileZilla pour un transfert graphique**

### Étape 3 : Déploiement sur le serveur

1. **Se connecter au serveur :**
   ```bash
   ssh user@your-server-ip
   ```

2. **Rendre le script exécutable :**
   ```bash
   chmod +x deploy-proxmox.sh
   ```

3. **Lancer le déploiement :**
   ```bash
   ./deploy-proxmox.sh
   ```

### Étape 4 : Configuration du domaine (optionnel)

Si vous avez un nom de domaine, modifiez la variable `DOMAIN` dans le script `deploy-proxmox.sh` avant l'exécution.

### Étape 5 : Configuration HTTPS avec Let's Encrypt (optionnel)

Après la configuration Nginx, vous pouvez ajouter HTTPS :

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔧 Gestion du conteneur

### Commandes utiles

- **Voir les logs :**
  ```bash
  docker logs estelle-matthieu-wedding
  ```

- **Redémarrer le conteneur :**
  ```bash
  docker restart estelle-matthieu-wedding
  ```

- **Arrêter le conteneur :**
  ```bash
  docker stop estelle-matthieu-wedding
  ```

- **Supprimer le conteneur :**
  ```bash
  docker rm -f estelle-matthieu-wedding
  ```

### Mise à jour de l'application

1. Reconstruire l'image sur Windows
2. Exporter la nouvelle image
3. Transférer sur le serveur
4. Relancer le script de déploiement

## 🛠️ Alternative : Déploiement avec Docker Compose

Vous pouvez aussi utiliser le fichier `docker-compose.yml` inclus :

```bash
# Sur le serveur
docker-compose up -d
```

## 📊 Monitoring

### Vérifier l'état du service

```bash
# Statut du conteneur
docker ps

# Utilisation des ressources
docker stats estelle-matthieu-wedding

# Logs en temps réel
docker logs -f estelle-matthieu-wedding
```

### Configuration de surveillance automatique

Pour recevoir des alertes en cas de problème, vous pouvez configurer un script de monitoring :

```bash
#!/bin/bash
# monitoring.sh
if ! docker ps | grep -q estelle-matthieu-wedding; then
    echo "Le conteneur de mariage est arrêté!" | mail -s "Alerte Serveur" admin@email.com
    docker restart estelle-matthieu-wedding
fi
```

Ajoutez ce script au crontab :
```bash
crontab -e
# Ajouter : */5 * * * * /path/to/monitoring.sh
```

## 🔒 Sécurité

### Recommandations

1. **Firewall :** Configurez le firewall pour n'autoriser que les ports nécessaires
2. **Mise à jour :** Maintenez le système et Docker à jour
3. **Backup :** Sauvegardez régulièrement votre configuration
4. **Monitoring :** Surveillez les logs pour détecter les activités suspectes

### Configuration du firewall (ufw)

```bash
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 🆘 Dépannage

### Problèmes courants

1. **Le conteneur ne démarre pas :**
   - Vérifiez les logs : `docker logs estelle-matthieu-wedding`
   - Vérifiez que le port n'est pas utilisé : `netstat -tulpn | grep :80`

2. **L'application n'est pas accessible :**
   - Vérifiez la configuration du firewall
   - Vérifiez la configuration Nginx si utilisé

3. **Erreur de mémoire :**
   - Vérifiez l'utilisation des ressources : `docker stats`
   - Augmentez la mémoire du conteneur LXC si nécessaire

## 📞 Support

En cas de problème, vérifiez :
1. Les logs du conteneur Docker
2. Les logs du système (`/var/log/syslog`)
3. La configuration Nginx (`/etc/nginx/sites-enabled/wedding`)
4. L'état du service Docker (`systemctl status docker`)

---

## 🚀 Méthode alternative : Déploiement par clonage Git

Si vous préférez déployer directement depuis le code source :

### Sur le serveur Proxmox

1. **Cloner le repository :**
   ```bash
   git clone <URL_DU_REPO> wedding-app
   cd wedding-app
   ```

2. **Construire et lancer :**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

Cette méthode est plus simple mais nécessite que votre serveur ait accès à internet pour télécharger les dépendances.

## 🔄 Sauvegarde et restauration

### Sauvegarde

```bash
# Sauvegarder l'image
docker save estelle-matthieu-wedding > backup-wedding.tar

# Sauvegarder les volumes (si applicable)
docker run --rm -v wedding_data:/data -v $(pwd):/backup alpine tar czf /backup/wedding-data.tar.gz /data
```

### Restauration

```bash
# Restaurer l'image
docker load < backup-wedding.tar

# Restaurer les volumes
docker run --rm -v wedding_data:/data -v $(pwd):/backup alpine tar xzf /backup/wedding-data.tar.gz -C /
```

## Prérequis

- Docker installé sur votre LXC Proxmox
- Docker Compose installé
- Git installé (pour cloner le projet)

## Installation de Docker sur LXC Ubuntu/Debian

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajout de l'utilisateur au groupe docker
sudo usermod -aG docker $USER

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Redémarrage de la session
newgrp docker
```

## Déploiement

### 1. Cloner le projet

```bash
git clone <URL_DE_VOTRE_REPO> wedding-site
cd wedding-site
```

### 2. Construire et démarrer l'application

```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Construire l'image Docker
./deploy.sh build

# Démarrer l'application
./deploy.sh start
```

### 3. Vérifier le déploiement

```bash
# Vérifier le statut
./deploy.sh status

# Consulter les logs
./deploy.sh logs
```

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `./deploy.sh build` | Construire l'image Docker |
| `./deploy.sh start` | Démarrer l'application |
| `./deploy.sh stop` | Arrêter l'application |
| `./deploy.sh restart` | Redémarrer l'application |
| `./deploy.sh logs` | Afficher les logs |
| `./deploy.sh status` | Afficher le statut |
| `./deploy.sh clean` | Nettoyer les images non utilisées |

## Configuration réseau Proxmox

### Configuration du LXC

1. Créer un LXC Ubuntu 22.04 avec au minimum :
   - 2 CPU cores
   - 2 GB RAM
   - 20 GB de stockage

2. Configurer le réseau :
   - Attribuer une IP statique
   - Ouvrir le port 80 (et 443 si HTTPS)

### Exemple de configuration réseau

```bash
# Dans le LXC, configurer une IP statique
sudo nano /etc/netplan/00-installer-config.yaml
```

```yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4
```

```bash
sudo netplan apply
```

## Configuration du pare-feu (optionnel)

```bash
# Installer ufw
sudo apt install ufw

# Configurer les règles
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Activer le pare-feu
sudo ufw enable
```

## Mise à jour de l'application

```bash
# Récupérer les dernières modifications
git pull origin main

# Reconstruire et redémarrer
./deploy.sh build
./deploy.sh restart
```

## Sauvegarde

```bash
# Sauvegarder l'image Docker
docker save estelle-matthieu-wedding > wedding-backup.tar

# Restaurer depuis une sauvegarde
docker load < wedding-backup.tar
```

## Surveillance

```bash
# Vérifier l'utilisation des ressources
docker stats

# Vérifier les logs en temps réel
docker-compose logs -f
```

## Dépannage

### L'application ne démarre pas

1. Vérifier les logs :
   ```bash
   ./deploy.sh logs
   ```

2. Vérifier l'état des conteneurs :
   ```bash
   docker ps -a
   ```

3. Reconstruire l'image :
   ```bash
   ./deploy.sh build
   ./deploy.sh restart
   ```

### Port déjà utilisé

Si le port 80 est déjà utilisé, modifier le `docker-compose.yml` :

```yaml
ports:
  - "8080:80"  # Utiliser le port 8080 à la place
```

## Sécurité

### HTTPS avec Let's Encrypt (optionnel)

Pour activer HTTPS, vous pouvez utiliser un reverse proxy comme Nginx Proxy Manager ou Traefik.

### Variables d'environnement

Créer un fichier `.env` pour les variables sensibles :

```bash
# .env
NODE_ENV=production
DOMAIN=votre-domaine.com
```

Puis modifier le `docker-compose.yml` pour inclure :

```yaml
env_file:
  - .env
```

## Support

En cas de problème, vérifiez :
1. Les logs de l'application
2. L'état des conteneurs Docker
3. La configuration réseau
4. L'espace disque disponible
