pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '--user 0'  // Run as root
        }
    }
    stages {
        stage('Fix npm cache') {
            steps {
                sh 'npm cache clean --force'
            }
        }
        stage('Install & Build') {
            steps {
                sh 'npm install --legacy-peer-deps --unsafe-perm'
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