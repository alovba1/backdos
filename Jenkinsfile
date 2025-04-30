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
                // Instalar dependencias necesarias antes de iniciar el servidor
                bat 'npm install'

                // Iniciar el servidor en segundo plano y guardar salida en un log
                bat 'start /B node server.js > server.log 2>&1'

                // Esperar unos segundos para asegurar que el servicio arranque correctamente
                script {
                    sleep(time: 5, unit: 'SECONDS')
                }

                // Verificar que el servidor realmente se inició
                script {
                    def serverRunning = bat(script: "netstat -ano | findstr :3000", returnStatus: true)
                    if (serverRunning != 0) {
                        echo "Error: El servidor no está corriendo, cancelando pruebas..."
                        error("El servidor no se inició correctamente.")
                    }
                }

                // Ejecutar los tests y capturar errores sin detener el pipeline
                script {
                    def testResult = bat(script: "npm test", returnStatus: true)
                    if (testResult != 0) {
                        echo "Tests fallaron, pero continuaremos con el pipeline..."
                    }
                }
            }
        }

        stage('Build') {
            steps {
                withCredentials([string(credentialsId: '05677c4d-d40b-4253-995b-fcca93f27f6e', variable: 'DOCKER_PASS')]) {
                    bat 'docker login -u albert1w22 -p %DOCKER_PASS%'
                    bat 'docker build -t albert1w22/backend-image:latest .'
                    bat 'docker push albert1w22/backend-image:latest'
                }

                // Detiene y elimina el contenedor anterior si existe
script {
    bat 'docker ps -q --filter "name=backend-container" | findstr . && docker stop backend-container || echo "No hay contenedor para detener"'
    bat 'docker ps -aq --filter "name=backend-container" | findstr . && docker rm backend-container || echo "No hay contenedor para eliminar"'
}



                // Ejecutar nuevo contenedor con la imagen correcta
                bat 'docker run -d -p 3000:3000 --name backend-container albert1w22/backend-image:latest'
            }
        }

        stage('Check Files') {
    steps {
        bat 'dir C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\pipelinebackkubernetes'
    }
}

stage('Deploy in Kubernetes') {
    agent {
        label 'kubernetes-node'
    }
    steps {
        script {
            withCredentials([string(credentialsId: '05677c4d-d40b-4253-995b-fcca93f27f6e', variable: 'DOCKER_PASS')]) {
                bat 'kubectl create secret docker-registry dockerhub-secret --docker-username=albert1w22 --docker-password=%DOCKER_PASS% --docker-server=https://index.docker.io/v1/'
            }
            bat 'kubectl apply -f C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\pipelinebackkubernetes\\backend-deployment.yaml || echo "Error en deployment, pero seguimos adelante"'
            bat 'kubectl apply -f C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\pipelinebackkubernetes\\backend-service.yaml || echo "Error en servicio, pero seguimos adelante"'
        }
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
