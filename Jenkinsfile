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
                bat 'docker run -d -p 3000:3000 --name backend-container backend-image'
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
