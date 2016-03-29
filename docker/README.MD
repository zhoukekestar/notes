
run docker with cert.
```bash
docker --tlsverify --tlscacert=D:/docker/cert/ca.pem --tlscert=D:/docker/cert/cert.pem --tlskey=D:/docker/cert/key.pem -H=tcp://master1.cs-cn-shenzhen.aliyun.com:17360 ps
```

login
```bash
docker login
```

search
```bash
docker search tutorial
```

build image
```bash
docker build -t <username>/<name> .
```

download image
```bash
docker pull learn/tutorial
```

To remove a container
```bash
docker rm <Container ID>
```
remove all containers: 
```bash
docker rm $(docker ps -a -q)
```

remove images
```bash
docker rmi <Container ID>
```

To remove all images: 
```bash
docker rmi $(docker ps -a -q)
```

List all containers:
```bash
docker ps -a
```

List all images:
```bash
docker images
```

Run bash:
```bash
docker run -it node:4.2 bash
```

Save a container to an image.
```bash
docker commit <id> <name>
```

Publish image
```bash
docker push <name>
```

Rename image
```bash
docker tag (<tagID> OR <name:tag>) <new-name>
```

Run a container:
```bash
docker start <container-id> && docker attach <container-id>
```

Speed up
```bash
docker-machine ssh default "echo 'EXTRA_ARGS=\"--registry-mirror=https://rgx8z0xn.mirror.aliyuncs.com\"' | sudo tee -a /var/lib/boot2docker/profile"
```
