# Script PowerShell pour exporter l'image Docker
# Usage: .\export-image.ps1

Write-Host "🚀 Export de l'image Docker pour déploiement..." -ForegroundColor Green

# Nom de l'image et du fichier de sauvegarde
$IMAGE_NAME = "estelle-matthieu-wedding"
$EXPORT_FILE = "estelle-matthieu-wedding.tar"

# Vérifier si Docker est disponible
try {
    docker --version | Out-Null
} catch {
    Write-Host "❌ Docker n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérifier si l'image existe
$imageExists = docker images -q $IMAGE_NAME
if (-not $imageExists) {
    Write-Host "❌ L'image $IMAGE_NAME n'existe pas. Construisez-la d'abord avec: docker build -t $IMAGE_NAME ." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Export de l'image $IMAGE_NAME vers $EXPORT_FILE..." -ForegroundColor Yellow

# Exporter l'image
try {
    docker save -o $EXPORT_FILE $IMAGE_NAME
    Write-Host "✅ Image exportée avec succès vers $EXPORT_FILE" -ForegroundColor Green
    
    # Afficher la taille du fichier
    $fileSize = (Get-Item $EXPORT_FILE).Length / 1MB
    Write-Host "📊 Taille du fichier: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    
    Write-Host "`n🔧 Pour déployer sur votre serveur Proxmox:" -ForegroundColor Yellow
    Write-Host "1. Transférez le fichier $EXPORT_FILE sur votre serveur" -ForegroundColor White
    Write-Host "2. Chargez l'image avec: docker load -i $EXPORT_FILE" -ForegroundColor White
    Write-Host "3. Lancez le conteneur avec: docker run -d -p 80:80 --name wedding-app $IMAGE_NAME" -ForegroundColor White
    
} catch {
    Write-Host "❌ Erreur lors de l'export: $_" -ForegroundColor Red
    exit 1
}
