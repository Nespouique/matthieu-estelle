#!/bin/bash

# Script de déploiement pour le site de mariage Estelle & Matthieu
# Utilisation: ./deploy.sh [start|stop|restart|build|logs|status]

PROJECT_NAME="estelle-matthieu-wedding"
CONTAINER_NAME="estelle-matthieu-wedding"

# Fonction pour afficher l'aide
show_help() {
    echo "Script de déploiement pour le site de mariage"
    echo ""
    echo "Utilisation: $0 [COMMANDE]"
    echo ""
    echo "Commandes disponibles:"
    echo "  build     - Construire l'image Docker"
    echo "  start     - Démarrer l'application"
    echo "  stop      - Arrêter l'application"
    echo "  restart   - Redémarrer l'application"
    echo "  logs      - Afficher les logs"
    echo "  status    - Afficher le statut"
    echo "  clean     - Nettoyer les images non utilisées"
    echo "  help      - Afficher cette aide"
}

# Fonction pour construire l'image
build_image() {
    echo "🏗️  Construction de l'image Docker..."
    docker-compose build --no-cache
    if [ $? -eq 0 ]; then
        echo "✅ Image construite avec succès"
    else
        echo "❌ Erreur lors de la construction"
        exit 1
    fi
}

# Fonction pour démarrer l'application
start_app() {
    echo "🚀 Démarrage de l'application..."
    docker-compose up -d
    if [ $? -eq 0 ]; then
        echo "✅ Application démarrée avec succès"
        echo "🌐 Site accessible sur: http://localhost"
    else
        echo "❌ Erreur lors du démarrage"
        exit 1
    fi
}

# Fonction pour arrêter l'application
stop_app() {
    echo "🛑 Arrêt de l'application..."
    docker-compose down
    if [ $? -eq 0 ]; then
        echo "✅ Application arrêtée avec succès"
    else
        echo "❌ Erreur lors de l'arrêt"
        exit 1
    fi
}

# Fonction pour redémarrer l'application
restart_app() {
    echo "🔄 Redémarrage de l'application..."
    stop_app
    start_app
}

# Fonction pour afficher les logs
show_logs() {
    echo "📋 Affichage des logs..."
    docker-compose logs -f --tail=100
}

# Fonction pour afficher le statut
show_status() {
    echo "📊 Statut de l'application:"
    docker-compose ps
    echo ""
    echo "💾 Utilisation des ressources:"
    docker stats --no-stream $CONTAINER_NAME 2>/dev/null || echo "Container non démarré"
}

# Fonction pour nettoyer
clean_up() {
    echo "🧹 Nettoyage des images non utilisées..."
    docker system prune -f
    echo "✅ Nettoyage terminé"
}

# Traitement des arguments
case "${1:-help}" in
    build)
        build_image
        ;;
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    clean)
        clean_up
        ;;
    help|*)
        show_help
        ;;
esac
