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


  stage('Build') {
    steps {
        bat 'docker build -t backend-image .'
        bat 'docker tag backend-image backend-image:latest'

        // Detiene y elimina el contenedor anterior si existe
        script {
            bat 'docker stop backend-container || echo "No hay contenedor en ejecución"'
            bat 'docker rm backend-container || echo "No se encontró el contenedor para eliminar"'
        }

        bat 'docker run -d -p 3000:3000 --name backend-container backend-image'
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
