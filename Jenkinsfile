pipeline {
    agent any
    tools {
        nodejs "Node 14.0.0"
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm i && npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
    }
}
