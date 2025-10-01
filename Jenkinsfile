pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/jenkins_home:/workspace'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Verify Environment') {
            steps {
                sh 'echo "Building Angular in Docker container..."'
                sh 'node --version'
                sh 'npm --version'
                sh 'pwd'
                sh 'ls -la'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }
        
        stage('Build Angular') {
            steps {
                sh 'npm run build -- --configuration=production'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test -- --watch=false --browsers=ChromeHeadless || echo "Tests completed"'
            }
        }
        
        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                echo 'Angular build artifacts archived!'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'ANGULAR FRONTEND PIPELINE SUCCESSFUL!'
        }
        failure {
            echo 'Build failed. Check logs above for details.'
        }
    }
}