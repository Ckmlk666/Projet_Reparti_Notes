# Image de base ultra-légère
FROM python:3.11-alpine

# Empêche Python de générer des fichiers .pyc (gain de place)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Installation des dépendances système nécessaires pour PostgreSQL
RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev

# Installation des dépendances Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code source
COPY . /app/

# Port exposé par Django
EXPOSE 8000

# Commande pour lancer le serveur (on utilisera gunicorn en prod, mais runserver pour l'instant)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]