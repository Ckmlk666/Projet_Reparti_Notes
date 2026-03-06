#!/bin/bash

echo "🔄 1. Création des fichiers de migration (au cas où)..."
python manage.py makemigrations

echo "📦 2. Application des migrations à la base de données..."
python manage.py migrate

echo "👤 3. Vérification et création de l'administrateur par défaut..."
# Ce petit script Python crée le compte admin/admin uniquement s'il n'existe pas déjà
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@admin.com', 'password123');
    print('✅ Super-administrateur créé (User: admin, Mdp: password123)');
else:
    print('ℹ️ Le super-administrateur existe déjà.');
"

echo "🚀 4. Démarrage du serveur Django..."
# La commande exec "$@" lance la commande CMD qui se trouve dans ton Dockerfile
exec "$@"