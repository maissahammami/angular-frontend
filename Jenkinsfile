pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
    }
    
    tools {
        nodejs 'nodejs-18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node --version'
                        sh 'npm --version'
                    } else {
                        bat 'node --version'
                        bat 'npm --version'
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build -- --configuration=production'
                    } else {
                        bat 'npm run build -- --configuration=production'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test -- --watch=false --browsers=ChromeHeadless'
                    } else {
                        bat 'npm test -- --watch=false --browsers=ChromeHeadless'
                    }
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    docker.build("assurance-frontend:${env.BUILD_ID}")
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo "Deploying frontend to staging"
                    // Add staging deployment commands
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying frontend to production"
                    // Add production deployment commands
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'dist/**/*'
            cleanWs()
        }
    }
}