# Script de nettoyage pour déploiement Portainer
# Usage: .\cleanup-for-portainer.ps1

Write-Host "🧹 Nettoyage pour déploiement Portainer..." -ForegroundColor Green

# Fichiers essentiels pour Portainer
$essentialFiles = @(
    "estelle-matthieu-wedding.tar",
    "docker-compose.portainer.yml", 
    "PORTAINER-GUIDE.md",
    "DEPLOYMENT.md"
)

# Fichiers optionnels avec Portainer (peuvent être supprimés)
$optionalFiles = @(
    "deploy-proxmox.sh",
    "export-image.ps1", 
    "check-deployment.ps1",
    "DEPLOYMENT-SUMMARY.md"
)

Write-Host "`n📋 Fichiers essentiels pour Portainer:" -ForegroundColor Yellow
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        if ($size -gt 1MB) {
            $sizeStr = "$([math]::Round($size / 1MB, 1)) MB"
        } elseif ($size -gt 1KB) {
            $sizeStr = "$([math]::Round($size / 1KB, 1)) KB"
        } else {
            $sizeStr = "$size bytes"
        }
        Write-Host "✅ $file ($sizeStr)" -ForegroundColor Green
    } else {
        Write-Host "❌ $file (manquant)" -ForegroundColor Red
    }
}

Write-Host "`n🗂️ Fichiers optionnels (peuvent être supprimés):" -ForegroundColor Yellow
foreach ($file in $optionalFiles) {
    if (Test-Path $file) {
        Write-Host "📄 $file (optionnel)" -ForegroundColor Cyan
    }
}

# Proposer le nettoyage
Write-Host "`n🤔 Voulez-vous supprimer les fichiers optionnels pour Portainer?" -ForegroundColor Yellow
$cleanup = Read-Host "Tapez 'oui' pour supprimer les fichiers optionnels"

if ($cleanup -eq "oui" -or $cleanup -eq "o" -or $cleanup -eq "y" -or $cleanup -eq "yes") {
    Write-Host "`n🗑️ Suppression des fichiers optionnels..." -ForegroundColor Red
    
    foreach ($file in $optionalFiles) {
        if (Test-Path $file) {
            Remove-Item $file -Force
            Write-Host "❌ Supprimé: $file" -ForegroundColor Red
        }
    }
    
    Write-Host "`n✅ Nettoyage terminé!" -ForegroundColor Green
} else {
    Write-Host "`n📂 Fichiers conservés. Vous pouvez les supprimer manuellement plus tard." -ForegroundColor Cyan
}

Write-Host "`n📦 Fichiers prêts pour Portainer:" -ForegroundColor Green
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Write-Host "📄 $file" -ForegroundColor White
    }
}

Write-Host "`n🚀 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Transférer estelle-matthieu-wedding.tar sur votre serveur" -ForegroundColor White
Write-Host "2. Charger l'image: docker load -i estelle-matthieu-wedding.tar" -ForegroundColor White  
Write-Host "3. Utiliser docker-compose.portainer.yml dans Portainer" -ForegroundColor White
Write-Host "4. Suivre PORTAINER-GUIDE.md pour le déploiement" -ForegroundColor White
