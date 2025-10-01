pipeline {
    agent any
    
    stages {
        stage('Check Environment') {
            steps {
                sh 'echo "Node.js is installed - building Angular..."'
                sh 'node --version'
                sh 'npm --version'
                sh 'pwd'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps --prefix ./node_modules --cache ./.npm-cache'
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