pipeline {
    agent any

    stages {
        stage('Setup Node.js Environment') {
            steps {
                withEnv(["PATH=C:\\Program Files\\nodejs;${env.PATH}"]) {
                    bat 'node --version'
                    bat 'npm --version'
                }
            }
        }

        stage('Check Environment') {
            steps {
                bat 'echo %PATH%'
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                bat 'docker build -t Albert1w22/backdos .'
                bat 'docker tag Albert1w22/backdos tu_usuario/dockerhub:backdos-latest'
                bat 'docker push Albert1w22/dockerhub:backdos-latest'
            }
        }

        stage('Deploy in Kubernetes') {
            steps {
                bat 'kubectl apply -f backend-deployment.yaml'
                bat 'kubectl apply -f backend-service.yaml'
            }
        }
    }

    post {
        success {
            echo 'Backend pipeline completed successfully!'
        }
        failure {
            echo 'Backend pipeline failed.'
        }
    }
}
