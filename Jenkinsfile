pipeline {
    agent any
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
