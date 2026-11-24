// Requires the Jenkins "NodeJS" plugin with a Node.js installation named 'node-24'
// (Node ^20.19, ^22.12 or >=24 is required by Angular 21).
pipeline {
  agent any

  tools {
    nodejs 'node-24'
  }

  options {
    timestamps()
  }

  stages {
    stage('Prepare') {
      steps {
        sh 'node --version && npm --version'
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test:ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Deploy') {
      steps {
        echo 'TODO: deploy dist/test-angular-yeo/browser'
      }
    }
  }
}
