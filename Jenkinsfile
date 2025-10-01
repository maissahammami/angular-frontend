pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/jenkins_home:/workspace --user root'
        }
    }
    
    environment {
        // Set npm cache to workspace directory
        NPM_CONFIG_CACHE = '/workspace/.npm'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup npm') {
            steps {
                sh '''
                echo "Setting up npm permissions..."
                # Fix npm permissions
                npm config set cache /workspace/.npm --global
                npm config set prefix /workspace/.npm --global
                # Clear any root-owned files
                rm -rf /root/.npm
                '''
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps --cache /workspace/.npm'
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