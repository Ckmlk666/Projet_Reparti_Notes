# On abandonne Alpine pour utiliser Slim (beaucoup plus rapide et stable)
FROM python:3.11-slim

# Empêche Python de générer des fichiers .pyc
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Installation de la librairie système minimale pour PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev && rm -rf /var/lib/apt/lists/*

# Copie et installation des dépendances Python
COPY requirements.txt /app/
RUN pip install --default-timeout=100 --no-cache-dir -r requirements.txt

# Copie du code source
COPY . /app/

EXPOSE 8000
# Copier le script de démarrage dans le conteneur
COPY entrypoint.sh /app/entrypoint.sh

# Donner les droits d'exécution au script
RUN chmod +x /app/entrypoint.sh

# Définir le script comme point d'entrée
ENTRYPOINT ["/app/entrypoint.sh"]

# Ta commande de lancement habituelle (vérifie que c'est bien celle que tu avais déjà)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]