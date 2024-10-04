pipeline {
    agent any

    stages {
        stage('Build Backend - Sahara-back') {
            environment {
                BACK_DB_URL = credentials('back_url')
                BACK_DB_USERNAME = credentials('back_user')
                BACK_DB_PASSWORD = credentials('back_password')
            }
            steps {
                dir('Sahara-back') {
                    withEnv(['DB_URL=${BACK_DB_URL}', 'DB_USERNAME=${BACK_DB_USERNAME}', 'DB_PASSWORD=${BACK_DB_PASSWORD}']) {
                        bat 'mvn clean install'
                    }
                }
            }
        }

        stage('Test Backend - Sahara-back') {
            steps {
                dir('Sahara-back') {
                    bat 'mvn test'
                }
            }
        }

        stage('Run Backend - Sahara-back') {
            environment {
                BACK_DB_URL = credentials('back_url')
                BACK_DB_USERNAME = credentials('back_user')
                BACK_DB_PASSWORD = credentials('back_password')
            }
            steps {
                dir('Sahara-back') {
                    withEnv(['DB_URL=${BACK_DB_URL}', 'DB_USERNAME=${BACK_DB_USERNAME}', 'DB_PASSWORD=${BACK_DB_PASSWORD}']) {
                        bat 'start /b mvn spring-boot:run'
                    }
                }
            }
        }

        stage('Build Backend - Sahara-cart') {
            environment {
                CART_DB_URL = credentials('cart_url')
                CART_DB_USERNAME = credentials('cart_user')
                CART_DB_PASSWORD = credentials('cart_password')
            }
            steps {
                dir('Sahara-cart') {
                    withEnv(['DB_URL=${CART_DB_URL}', 'DB_USERNAME=${CART_DB_USERNAME}', 'DB_PASSWORD=${CART_DB_PASSWORD}']) {
                        bat 'mvn clean install'
                    }
                }
            }
        }

       stage('Test Backend - Sahara-cart') {
            steps {
                dir('Sahara-cart') {
                    bat 'mvn test'
                }
            }
        }

        stage('Run Backend - Sahara-cart') {
            environment {
                CART_DB_URL = credentials('cart_url')
                CART_DB_USERNAME = credentials('cart_user')
                CART_DB_PASSWORD = credentials('cart_password')
            }
            steps {
                dir('Sahara-cart') {
                    withEnv(['DB_URL=${CART_DB_URL}', 'DB_USERNAME=${CART_DB_USERNAME}', 'DB_PASSWORD=${CART_DB_PASSWORD}']) {
                        bat 'start /b mvn spring-boot:run'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Sahara-front') {
                    bat 'npm ci'
                }
            }
        }



  


        stage('Run Frontend') {
            steps {
                dir('Sahara-front') {
                    bat 'start npm start'
                }
            }
        }
    


              stage('Deploy - Production') {
            steps {
                echo 'Deploying to production'
            }
            post {
                always {
                    jiraSendDeploymentInfo site: 'https://lornagordonsmith-1728029945609.atlassian.net', environmentId: 'prod1', environmentName: 'production', environmentType: 'live'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete'
        }
        success {
            echo 'Build, test and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
