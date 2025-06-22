#!/bin/bash

# Script de déploiement pour serveur Proxmox/Linux
# Usage: ./deploy-proxmox.sh

set -e

# Configuration
CONTAINER_NAME="estelle-matthieu-wedding"
IMAGE_NAME="estelle-matthieu-wedding"
IMAGE_FILE="estelle-matthieu-wedding.tar"
PORT="80"
DOMAIN="your-domain.com"  # Remplacez par votre domaine

echo "🚀 Déploiement de l'application de mariage sur Proxmox..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Installation en cours..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "✅ Docker installé. Redémarrez votre session pour utiliser Docker sans sudo."
fi

# Vérifier si le fichier d'image existe
if [ ! -f "$IMAGE_FILE" ]; then
    echo "❌ Le fichier $IMAGE_FILE n'existe pas."
    echo "Transférez d'abord le fichier depuis votre machine Windows."
    exit 1
fi

# Arrêter et supprimer le conteneur existant s'il existe
if docker ps -a --format 'table {{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    echo "🛑 Arrêt du conteneur existant..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
fi

# Supprimer l'ancienne image si elle existe
if docker images -q $IMAGE_NAME 2> /dev/null; then
    echo "🗑️ Suppression de l'ancienne image..."
    docker rmi $IMAGE_NAME || true
fi

# Charger la nouvelle image
echo "📦 Chargement de l'image Docker..."
docker load -i $IMAGE_FILE

# Lancer le nouveau conteneur
echo "🚀 Lancement du conteneur..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:80 \
    $IMAGE_NAME

# Vérifier que le conteneur fonctionne
sleep 5
if docker ps --format 'table {{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    echo "✅ Conteneur lancé avec succès!"
    echo "🌐 Application accessible sur http://localhost:$PORT"
    if [ "$DOMAIN" != "your-domain.com" ]; then
        echo "🌐 Ou sur http://$DOMAIN:$PORT"
    fi
else
    echo "❌ Erreur lors du lancement du conteneur"
    docker logs $CONTAINER_NAME
    exit 1
fi

# Configuration optionnelle de Nginx reverse proxy
read -p "🔧 Voulez-vous configurer un reverse proxy Nginx? (y/n): " setup_nginx

if [ "$setup_nginx" == "y" ] || [ "$setup_nginx" == "Y" ]; then
    echo "📝 Configuration du reverse proxy Nginx..."
    
    # Installation de Nginx si nécessaire
    if ! command -v nginx &> /dev/null; then
        sudo apt update
        sudo apt install -y nginx
    fi
    
    # Créer la configuration du site
    sudo tee /etc/nginx/sites-available/wedding > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://localhost:$PORT;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
    
    # Activer le site
    sudo ln -sf /etc/nginx/sites-available/wedding /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    
    echo "✅ Reverse proxy configuré!"
    echo "🌐 Application accessible sur http://$DOMAIN"
fi

echo ""
echo "🎉 Déploiement terminé avec succès!"
echo "📊 Statut du conteneur:"
docker ps --filter name=$CONTAINER_NAME --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
