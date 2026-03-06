pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'malickcissoko' 
        APP_NAME = 'projet_reparti_notes'
    }

    stages {
        stage('Linting & static analysis') {
            steps {
                echo 'Vérification de la syntaxe du code...'
                // sh 'flake8 backend/' (exemple de commande)
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${DOCKERHUB_USER}/${APP_NAME}-backend ./backend"
                sh "docker build -t ${DOCKERHUB_USER}/${APP_NAME}-frontend ./frontend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                
                sh "docker push ${DOCKERHUB_USER}/${APP_NAME}-backend"
                sh "docker push ${DOCKERHUB_USER}/${APP_NAME}-frontend"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Déploiement sur Minikube...'
                sh "kubectl apply -f k8s/"
                sh "kubectl rollout restart deployment/backend-deployment"
            }
        }
    }
}