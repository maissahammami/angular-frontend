pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '--user root'
        }
    }
    stages {
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