# Script de nettoyage du projet

# Supprimer les composants vides
rm -f src/components/Contact.jsx
rm -f src/components/DietaryInfo.jsx  
rm -f src/components/Transportation.jsx
rm -f src/components/WeddingParty.jsx
rm -f src/components/GuestBook.jsx

# Supprimer le dossier memories obsolète
rm -rf src/components/memories/

# Supprimer les traductions françaises obsolètes  
rm -f src/lib/translations/sections/fr/contact.js
rm -f src/lib/translations/sections/fr/dietaryInfo.js
rm -f src/lib/translations/sections/fr/transportation.js
rm -f src/lib/translations/sections/fr/weddingParty.js
rm -f src/lib/translations/sections/fr/guestBook.js

# Supprimer les traductions anglaises obsolètes
rm -f src/lib/translations/sections/en/contact.js  
rm -f src/lib/translations/sections/en/dietaryInfo.js
rm -f src/lib/translations/sections/en/transportation.js
rm -f src/lib/translations/sections/en/weddingParty.js
rm -f src/lib/translations/sections/en/guestBook.js

# Supprimer les composants UI inutilisés
rm -f src/components/ui/card.jsx
rm -f src/components/ui/modal.jsx
rm -f src/components/ui/tabs.jsx

echo "Nettoyage terminé !"