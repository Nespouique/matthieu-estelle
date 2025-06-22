# Script de vérification avant déploiement
# Usage: .\check-deployment.ps1

Write-Host "🔍 Vérification de l'environnement de déploiement..." -ForegroundColor Green

$allGood = $true

# Vérifier Docker
Write-Host "`n📦 Vérification de Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker installé: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker n'est pas installé ou accessible" -ForegroundColor Red
    $allGood = $false
}

# Vérifier l'image Docker
Write-Host "`n🖼️ Vérification de l'image Docker..." -ForegroundColor Yellow
$imageExists = docker images -q estelle-matthieu-wedding
if ($imageExists) {
    $imageInfo = docker images estelle-matthieu-wedding --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
    Write-Host "✅ Image Docker trouvée:" -ForegroundColor Green
    Write-Host "$imageInfo" -ForegroundColor Cyan
} else {
    Write-Host "❌ Image Docker 'estelle-matthieu-wedding' non trouvée" -ForegroundColor Red
    Write-Host "Construisez l'image avec: docker build -t estelle-matthieu-wedding ." -ForegroundColor Yellow
    $allGood = $false
}

# Vérifier le fichier tar
Write-Host "`n📄 Vérification du fichier d'export..." -ForegroundColor Yellow
if (Test-Path "estelle-matthieu-wedding.tar") {
    $fileSize = (Get-Item "estelle-matthieu-wedding.tar").Length / 1MB
    Write-Host "✅ Fichier tar trouvé: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Green
} else {
    Write-Host "❌ Fichier 'estelle-matthieu-wedding.tar' non trouvé" -ForegroundColor Red
    Write-Host "Exécutez: docker save -o estelle-matthieu-wedding.tar estelle-matthieu-wedding" -ForegroundColor Yellow
    $allGood = $false
}

# Vérifier les scripts de déploiement
Write-Host "`n📜 Vérification des scripts de déploiement..." -ForegroundColor Yellow
$scripts = @("deploy-proxmox.sh", "export-image.ps1")
foreach ($script in $scripts) {
    if (Test-Path $script) {
        Write-Host "✅ Script trouvé: $script" -ForegroundColor Green
    } else {
        Write-Host "❌ Script manquant: $script" -ForegroundColor Red
        $allGood = $false
    }
}

# Vérifier la documentation
Write-Host "`n📚 Vérification de la documentation..." -ForegroundColor Yellow
$docs = @("DEPLOYMENT.md", "DEPLOYMENT-SUMMARY.md")
foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "✅ Documentation trouvée: $doc" -ForegroundColor Green
    } else {
        Write-Host "❌ Documentation manquante: $doc" -ForegroundColor Red
        $allGood = $false
    }
}

# Vérifier les fichiers Docker
Write-Host "`n🐳 Vérification des fichiers Docker..." -ForegroundColor Yellow
$dockerFiles = @("Dockerfile", "docker-compose.yml", "nginx.conf")
foreach ($file in $dockerFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Fichier Docker trouvé: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Fichier Docker manquant: $file" -ForegroundColor Red
        $allGood = $false
    }
}

# Test de construction rapide (optionnel)
Write-Host "`n🧪 Test de construction rapide..." -ForegroundColor Yellow
try {
    $buildTest = docker build --no-cache -q . 2>$null
    if ($buildTest) {
        Write-Host "✅ Test de construction réussi" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Test de construction échoué (peut être normal)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️ Impossible de tester la construction" -ForegroundColor Yellow
}

# Résumé final
Write-Host "`n" + "="*50 -ForegroundColor Cyan
if ($allGood) {
    Write-Host "🎉 TOUT EST PRÊT POUR LE DÉPLOIEMENT!" -ForegroundColor Green
    Write-Host "`nProchaines étapes:" -ForegroundColor Yellow
    Write-Host "1. Transférez estelle-matthieu-wedding.tar vers votre serveur" -ForegroundColor White
    Write-Host "2. Transférez deploy-proxmox.sh vers votre serveur" -ForegroundColor White
    Write-Host "3. Exécutez ./deploy-proxmox.sh sur le serveur" -ForegroundColor White
    Write-Host "`nCommandes de transfert:" -ForegroundColor Yellow
    Write-Host "scp estelle-matthieu-wedding.tar user@server-ip:/home/user/" -ForegroundColor Cyan
    Write-Host "scp deploy-proxmox.sh user@server-ip:/home/user/" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ PROBLÈMES DÉTECTÉS - RÉSOLVEZ-LES AVANT LE DÉPLOIEMENT" -ForegroundColor Red
    Write-Host "`nVérifiez les erreurs ci-dessus et réexécutez ce script." -ForegroundColor Yellow
}
Write-Host "="*50 -ForegroundColor Cyan
