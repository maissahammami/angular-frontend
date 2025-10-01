pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/jenkins_home:/workspace --user root'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Fix npm permissions') {
            steps {
                sh '''
                # Fix npm cache permissions
                mkdir -p /workspace/.npm
                chmod -R 777 /workspace/.npm
                npm config set cache /workspace/.npm
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps --unsafe-perm'
            }
        }
        
        stage('Build Angular') {
            steps {
                sh 'npm run build -- --configuration=production'
            }
        }
        
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}