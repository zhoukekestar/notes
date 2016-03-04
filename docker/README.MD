
## run docker with cert.
docker --tlsverify --tlscacert=D:/docker/cert/ca.pem --tlscert=D:/docker/cert/cert.pem --tlskey=D:/docker/cert/key.pem -H=tcp://master1.cs-cn-shenzhen.aliyun.com:17360 ps

## login
docker login

## search
docker search tutorial

## download image
docker pull learn/tutorial

## CMDS
* To remove a container: docker rm <Container ID>
* To remove all containers: docker rm $(docker ps -a -q)
* To remove images: docker rmi <Container ID>
* To remove all images: docker rmi $(docker ps -a -q)

## List all containers:
docker ps -a

## List all images:
docker images

## Run bash:
docker run -it node:4.2 bash

## Save a container to an image.
docker commit <id> <name>

## Publish image
docker push <name>

## Rename image
docker tag (<tagID> OR <name:tag>) <new-name>

## Run a container:
docker start <container-id> && docker attach <container-id>
