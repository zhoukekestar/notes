
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

remove containers & remove images
```bash
docker rm <Container ID>
docker rm $(docker ps -a -q)
docker rmi <Container ID>
docker rmi $(docker ps -a -q)
```

List all containers & List all images:
```bash
docker ps -a
docker images
```

Run bash & run in the background:
```bash
docker run -it node:4.2 bash
docker run -p 49160:8080 -d <your username>/centos-node-hello
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
