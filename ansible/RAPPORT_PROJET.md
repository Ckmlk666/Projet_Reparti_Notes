# 🚀 Rapport de Projet : Déploiement d'un Système Réparti (DevOps & CI/CD)

## 📖 Introduction
Ce projet consiste à déployer une application web complète (Architecture 3-Tiers : Frontend en React, Backend en Django, Base de données en PostgreSQL) en utilisant les meilleures pratiques DevOps. L'objectif était de passer d'un code source local à une infrastructure hautement disponible, résiliente et dont le déploiement est entièrement automatisé.

---

## 🐳 Phase 1 : La Conteneurisation (Docker)

La première étape a consisté à isoler notre application de la machine hôte. Au lieu d'installer Python, Node.js et toutes les dépendances sur Windows, nous avons "empaqueté" le code dans des conteneurs.



### Commandes clés utilisées :
* `docker tag projet_reparti_notes-backend malickcissoko/django-notes:v1`
* `docker tag projet_reparti_notes-frontend malickcissoko/react-notes:v1`
  * **Explication :** Ces commandes renomment (tag) les images générées localement pour leur donner un nom standardisé. Cela prépare les images à être lues par un orchestrateur ou envoyées sur le cloud (Docker Hub).

---

## ☸️ Phase 2 : L'Orchestration (Kubernetes & Minikube)

Pour gérer nos conteneurs de manière professionnelle, nous avons utilisé Kubernetes (K8s). Comme K8s est conçu pour le Cloud, nous avons utilisé Minikube pour créer un "mini-cloud" virtuel directement sur l'ordinateur.



### Commandes clés utilisées :
* `minikube start`
  * **Explication :** Allume la machine virtuelle (le nœud) qui va héberger notre cluster Kubernetes local.
* `minikube image load <nom_image>`
  * **Explication :** Injecte nos images Docker locales directement dans le cache de Minikube. Cela évite à Kubernetes de chercher les images sur Internet (ce qui causait l'erreur `ImagePullBackOff`).
* `kubectl apply -f k8s/<fichier>.yaml`
  * **Explication :** Envoie nos fichiers de configuration (Deployments et Services) au "cerveau" de Kubernetes. C'est un contrat qui dit : *"Assure-toi que ces applications tournent en permanence"*.
* `kubectl get pods`
  * **Explication :** Affiche la liste des conteneurs (Pods) en cours d'exécution et leur statut (ex: `Running`, `ContainerCreating`, ou les redémarrages `RESTARTS` en cas de crash).
* `kubectl delete pod -l app=<nom_app>`
  * **Explication :** Supprime manuellement les pods bloqués pour forcer Kubernetes à en recréer de nouveaux avec les bonnes images.

---

## ⚙️ Phase 3 : Configuration métier et Exposition

Une fois les conteneurs démarrés, il fallait initialiser la base de données (PostgreSQL) et rendre l'application accessible depuis le navigateur.

### Commandes clés utilisées :
* `kubectl exec -it deployment/backend-deployment -- python manage.py migrate`
  * **Explication :** `kubectl exec` permet d'entrer à l'intérieur du conteneur Backend en cours d'exécution pour y lancer une commande distante. Ici, on demande à Django de créer les tables (Student, Grade) dans la base de données Postgres vide.
* `minikube service frontend-service`
  * **Explication :** Kubernetes étant un environnement fermé, cette commande demande à Minikube de créer un "tunnel" réseau (LoadBalancer) pour exposer le port du Frontend vers l'ordinateur physique (Windows), ouvrant ainsi le site dans le navigateur.

---

## 📜 Phase 4 : L'Infrastructure as Code (Ansible)

Pour éviter de retaper les commandes `kubectl apply` manuellement en cas de crash, nous avons écrit un script d'automatisation (un Playbook) avec **Ansible**.

* **Fichier créé :** `ansible/deploy.yml`
* **Objectif :** Ce fichier YAML liste toutes les tâches de déploiement dans l'ordre (Postgres -> Django -> React -> Pause -> Migration).

### Commande clé utilisée :
* `ansible-playbook deploy.yml`
  * **Explication :** Demande à Ansible de lire la recette et de l'exécuter. *(Note : Sous Windows, Ansible rencontre des limitations techniques `[WinError 1]`, ce qui nous a poussés à utiliser un serveur Linux via Jenkins pour l'exécution).*

---

## 🤖 Phase 5 : L'Intégration Continue (Git & Jenkins)

La dernière étape consistait à créer un vrai flux "DevOps". Nous avons envoyé le code sur Internet (GitHub) et configuré un robot (Jenkins) pour qu'il le lise et valide l'infrastructure automatiquement.



### 1. Gestion du code source (Git)
* `git init` : Initialise le suivi des modifications dans le dossier.
* `git add .` : Prépare tous les fichiers (sauf ceux du `.gitignore`) à être sauvegardés.
* `git commit -m "..."` : Crée une sauvegarde locale (une "photo") du code.
* `git remote add origin <url>` : Connecte le dossier local au serveur GitHub distant.
* `git push -u origin main` : Envoie les fichiers sur Internet de manière sécurisée.

### 2. Le Serveur d'Automatisation (Jenkins)
* `docker run -d -p 8081:8080 --name mon-jenkins jenkins/jenkins:lts-alpine`
  * **Explication :** Lance un serveur Jenkins léger (sous Linux Alpine) en arrière-plan et le rend accessible sur le port 8081 du navigateur.
* `docker logs mon-jenkins`
  * **Explication :** Permet de lire le journal de bord du conteneur pour y récupérer le mot de passe administrateur initial de Jenkins.
* `docker exec -u root mon-jenkins apk add ansible`
  * **Explication :** Entre dans le conteneur Jenkins avec les droits d'administrateur (`root`) pour y installer l'outil `ansible`, lui donnant la capacité de lire notre Playbook.

### 3. Le Pipeline (Le Job Jenkins)
Dans l'interface web de Jenkins, nous avons configuré un "Projet Freestyle" qui effectue deux actions :
1. Télécharger la dernière version du code depuis notre dépôt GitHub.
2. Exécuter un script shell contenant la commande `ansible-playbook ansible/deploy.yml --syntax-check` pour valider que le code d'infrastructure est correct à chaque mise à jour.

## 🎯 Conclusion
Ce projet illustre la puissance des architectures modernes. Le code est isolé (Docker), géré intelligemment (Kubernetes), décrit sous forme de code (Ansible) et surveillé par un système d'intégration continue (Jenkins).

echo "Test automatisation Jenkins" > test_auto.txt