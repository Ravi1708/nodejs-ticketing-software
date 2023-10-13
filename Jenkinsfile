pipeline {
    agent any

    stages {
        stage('deploy') {
            steps {
                script {
                    sh 'apt update' 
                    sh 'apt install openssh-client sshpass' 
                    sh "sshpass -p \"gcpubuntu@2022\" ssh -p 22 root@34.125.207.57 'cd /opt/nodejs-ticketing-software && git pull origin master'"
                    sh "sshpass -p \"gcpubuntu@2022\" ssh -p 22 root@34.125.207.57 'cd /opt/nodejs-ticketing-software && git pull origin master'"
                    sh "sshpass -p \"gcpubuntu@2022\" ssh -p 22 root@34.125.207.57 'cd /opt/nodejs-ticketing-software && npm install && pm2 restart server'"
                }
            }
            
        }
    }

    post {
        success {
            // Define actions to be taken on successful build
        }
    }

    environment {
        // Define environment variables, e.g., SSH_PASSWORD, SSH_PORT, SERVER_USERNAME, SERVER_HOST, etc.
    }
}
