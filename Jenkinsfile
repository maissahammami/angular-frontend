pipeline {
    agent any
    
    stages {
        stage('Check Environment') {
            steps {
                sh 'echo "Building Angular with system Node.js..."'
                sh 'node --version'
                sh 'npm --version'
                sh 'pwd'
                sh 'ls -la'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps --cache ./.npm-cache'
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
                echo '🎉 ANGULAR FRONTEND PIPELINE SUCCESSFUL!'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}