def secret = 'vm'
pipeline {
   agent any
   environment{
       server = 'alfian@103.127.99.164'
       directory = '/home/alfian/housy-be-cicd-jenkins'
       branch = 'main'
       service = 'backend'
       tag = 'latest'
       image = 'backendteam1'
   }
   stages {
       stage('Pull code dari repository'){
         steps {
            sshagent([secret]) {
                sh """ 
                ssh -o StrictHostKeyChecking=no ${server} << EOF
                cd ${directory}
                git pull origin ${branch}
                exit
                EOF"""
               }
           }
       }
       stage('Building application') {
         steps {
            sshagent([secret]) {
                sh """
                ssh -o StrictHostKeyChecking=no ${server} << EOF
                cd ${directory}
                docker build -t ${image}:${tag} .
                exit
                EOF"""
               }
           }
       }
       stage('Testing application') {
         steps {
            sshagent([secret]) {
                sh """
                ssh -o StrictHostKeyChecking=no ${server} << EOF
                cd ${directory}
                docker run --name test_be -p 5000:5000 -d ${image}:${tag}
                wget --spider localhost:5000
                docker stop test_be
                docker rm test_be
                exit
                EOF"""
               }
           }
       }
       stage('Deploy aplikasi on top docker'){
         steps {
            sshagent([secret]) {
                sh """
               ssh -o StrictHostKeyChecking=no ${server} << EOF
                sed -i '22c\\ image: ${image}:${tag}' docker-compose.yaml
                docker compose up -d
                cd ${directory}
                exit
                EOF"""
               }
           }
       }
       stage('Push image to docker hub') {
            steps {
                sshagent([aanalff]) {
                    withCredentials([usernamePassword(credentialsId: aanalff, passwordVariable: 'AanPrograms1.', usernameVariable: 'aanalff')]) {
                        sh '''
                        ssh -o StrictHostKeyChecking=no ${server} << EOF
                        echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                        docker tag ${image}:${tag} $DOCKERHUB_USERNAME/${image}:${tag}
                        docker push $DOCKERHUB_USERNAME/${image}:${tag}
                        exit
                        EOF'''
                    }
                }
            }
        }
       stage('send notification to discord'){
         steps {
            discordSend description: "backend-team1 notify", footer: "alfian notify", link:
env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1240153059674423326/XjUW5UpIS4XJoCmyK-6amPN7Ap3H_cfgKf2L2-SpsHmGv1fx3g-Kr6Xg0BnWYeVP_ZYB"
             } 
          }
       }
    }
