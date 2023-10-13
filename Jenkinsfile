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
}
