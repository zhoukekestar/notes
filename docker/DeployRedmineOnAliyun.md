
## Docker目录（windows）
"C:\Program Files\Docker Toolbox"

## 设置为阿里云的docker服务
```bash
set DOCKER_TLS_VERIFY=1
set DOCKER_HOST=tcp://master2.cs-cn-hangzhou.aliyun.com:13678
set DOCKER_CERT_PATH=D:\docker\certs\
````

## 使用容器mysql
```bash
docker run -p 3306:3306 -d --name redmine-mysql -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=redmine mysql
docker run -p 80:3000 -d --name toomao-redmine --link redmine-mysql:mysql redmine:3.1
```

## 使用RDS部署
```bash
docker run -p 80:80 -d --name=toomao-redmine-rds 
--env='DB_ADAPTER=mysql2' 
--env='DB_HOST=xxx.xxx' 
--env='DB_NAME=redmine' 
--env='DB_USER=redmine' 
--env='DB_PASS=123456' 
--env='SMTP_USER=xxx'
--env='SMTP_DOMAIN=smtp.qq.com'
--env='SMTP_HOST=smtp.qq.com'
--env='SMTP_PORT=25'
--env='SMTP_PASS=xxx'
--env='SMTP_METHOD=smtp'
--env='SMTP_AUTHENTICATION=plain'
--volume=/srv/docker/redmine/redmine:/home/redmine/data sameersbn/redmine:3.2.1-6

// 合并成一行
docker run -p 80:80 -d --name=toomao-redmine-rds  --env='DB_ADAPTER=mysql2'  --env='DB_HOST=xxxx'  --env='DB_NAME=redmine'  --env='DB_USER=redmine'  --env='DB_PASS=123456'  --env='SMTP_USER=xxx' --env='SMTP_DOMAIN=smtp.qq.com' --env='SMTP_HOST=smtp.qq.com' --env='SMTP_PORT=25' --env='SMTP_PASS=xxx' --env='SMTP_METHOD=smtp' --env='SMTP_AUTHENTICATION=plain' --volume=/srv/docker/redmine/redmine:/home/redmine/data sameersbn/redmine:3.2.1-6
```
