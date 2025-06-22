# 🐳 Déploiement avec Portainer - Guide Simplifié

## 📋 Fichiers nécessaires

Avec Portainer, vous n'avez besoin que de **3 fichiers** :

1. ✅ **`estelle-matthieu-wedding.tar`** - L'image Docker (50 MB)
2. ✅ **`docker-compose.portainer.yml`** - Configuration pour Portainer
3. ✅ **Ce guide** - Instructions de déploiement

## 🚀 Déploiement en 3 étapes

### Étape 1 : Transférer l'image sur votre serveur

```powershell
# Depuis Windows
scp estelle-matthieu-wedding.tar user@your-server-ip:/home/user/
```

### Étape 2 : Charger l'image Docker

```bash
# Sur le serveur Proxmox
ssh user@your-server-ip
docker load -i estelle-matthieu-wedding.tar
```

Vérifiez que l'image est chargée :
```bash
docker images | grep estelle-matthieu-wedding
```

### Étape 3 : Déployer via Portainer

1. **Accéder à Portainer** : `http://your-server-ip:9000`

2. **Créer une nouvelle Stack** :
   - Aller dans **"Stacks"** dans le menu de gauche
   - Cliquer **"Add Stack"**
   - Donner un nom : `wedding-app`

3. **Coller la configuration** :
   ```yaml
   version: '3.8'

   services:
     wedding-app:
       image: estelle-matthieu-wedding:latest
       container_name: estelle-matthieu-wedding
       restart: unless-stopped
       ports:
         - "80:80"
       networks:
         - wedding-network
       environment:
         - NODE_ENV=production
       labels:
         - "com.docker.compose.project=estelle-matthieu-wedding"
       healthcheck:
         test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/"]
         interval: 30s
         timeout: 10s
         retries: 3
         start_period: 40s

   networks:
     wedding-network:
       driver: bridge
   ```

4. **Déployer** : Cliquer **"Deploy the stack"**

## 🎯 Vérification du déploiement

### Dans Portainer
- **Containers** → Vérifier que `estelle-matthieu-wedding` est **Running**
- **Logs** → Vérifier qu'il n'y a pas d'erreurs
- **Stats** → Monitorer l'utilisation des ressources

### Test de l'application
- Accéder à `http://your-server-ip`
- Vérifier que l'application se charge correctement

## 🔧 Gestion via Portainer

### Actions disponibles dans l'interface
- ▶️ **Start/Stop** du conteneur
- 🔄 **Restart** en cas de problème
- 📊 **Logs** en temps réel
- 📈 **Statistiques** d'utilisation
- ⚙️ **Modification** de la configuration
- 🔄 **Mise à jour** de l'image

### Mise à jour de l'application
1. Construire une nouvelle image sur Windows
2. Exporter : `docker save -o estelle-matthieu-wedding-v2.tar estelle-matthieu-wedding`
3. Transférer sur le serveur
4. Charger : `docker load -i estelle-matthieu-wedding-v2.tar`
5. Dans Portainer → **Stacks** → **Update** → **Re-deploy**

## 🔒 Configuration HTTPS (optionnel)

Si vous voulez HTTPS avec Traefik + Portainer :

```yaml
version: '3.8'

services:
  wedding-app:
    image: estelle-matthieu-wedding:latest
    container_name: estelle-matthieu-wedding
    restart: unless-stopped
    networks:
      - traefik-network
    environment:
      - NODE_ENV=production
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.wedding.rule=Host(\`your-domain.com\`)"
      - "traefik.http.routers.wedding.entrypoints=websecure"
      - "traefik.http.routers.wedding.tls.certresolver=letsencrypt"
      - "traefik.http.services.wedding.loadbalancer.server.port=80"

networks:
  traefik-network:
    external: true
```

## 📊 Monitoring

### Alertes dans Portainer
1. **Notifications** → Configurer Slack/Email
2. **Webhooks** → Notifications personnalisées
3. **Health checks** → Surveillance automatique

### Métriques importantes
- **CPU Usage** < 50%
- **Memory Usage** < 80%
- **Response Time** < 2s
- **Uptime** > 99%

## 🆘 Dépannage rapide

### Le conteneur ne démarre pas
1. **Portainer** → **Containers** → **Logs**
2. Vérifier les erreurs dans les logs
3. **Console** → Accéder au conteneur pour debug

### L'application n'est pas accessible
1. Vérifier le **port mapping** (80:80)
2. Vérifier le **firewall** du serveur
3. Tester : `curl http://localhost` depuis le serveur

### Performance lente
1. **Stats** → Vérifier CPU/Memory
2. **Networks** → Vérifier la connectivité
3. Augmenter les ressources du LXC si nécessaire

## ✅ Avantages de Portainer

- 🖱️ **Interface graphique** intuitive
- 📊 **Monitoring** intégré
- 🔄 **Gestion facile** des containers
- 📝 **Logs centralisés**
- ⚙️ **Configuration visuelle**
- 🔒 **Gestion des utilisateurs**
- 📈 **Métriques en temps réel**

---

**Avec Portainer, le déploiement devient un jeu d'enfant ! 🎮**
