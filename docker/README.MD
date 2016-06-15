

```bash
docker login                          //login

docker search tutorial                //search

docker build -t <username>/<name> .   //build image

docker pull learn/tutorial            //download image

docker rm <Container ID>              //remove containers
docker rm $(docker ps -a -q)
docker rmi <image ID>                 // remove images
docker rmi $(docker ps -a -q)
docker kill <Container ID>            // kill container

docker ps -a                          //List all containers
docker images                         //List all images

docker run -it node:4.2 bash          //Run bash
docker run -p 49160:8080 -d <your username>/centos-node-hello //run in the background

docker commit <id> <name>             //Save a container to an image.

docker push <name>                    //Publish image

docker tag (<tagID> OR <name:tag>) <new-name> Rename image

docker start <container-id> && docker attach <container-id> //Run a container

docker logs <container-id>              // see log

docker-machine ip VM_NAME               // see machine's ip address. Example: docker-machine ip default

docker exec -it <CID> /bin/bash         // Get into a container
exit                                    //  exit without killing current container

docker cp file <CID>:/file              // Copy file to container
docker cp abc.txt 49:/abc.txt

docker run -it nginx /bin/bash
docker run -it --entrypoint /bin/bash nginx

```

Speed up
```bash
docker-machine ssh default "echo 'EXTRA_ARGS=\"--registry-mirror=https://rgx8z0xn.mirror.aliyuncs.com\"' | sudo tee -a /var/lib/boot2docker/profile"
```

run docker with cert.
```bash
docker --tlsverify --tlscacert=D:/docker/cert/ca.pem --tlscert=D:/docker/cert/cert.pem --tlskey=D:/docker/cert/key.pem -H=tcp://master1.cs-cn-shenzhen.aliyun.com:17360 ps
```
