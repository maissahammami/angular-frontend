pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                # Use local cache directory to avoid permission issues
                mkdir -p .npm-cache
                npm install --legacy-peer-deps --cache .npm-cache --no-optional
                '''
            }
        }
        
        stage('Build') {
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
}