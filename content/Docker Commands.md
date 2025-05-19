###  Redis
1. start redis in detached mode. 
```shell
docker run --name my-redis -d -p 6379:6379 redis
```
2. connect to your container 
```shell
docker exec -it contianer_id /bin/bash
```
3. Connecting to redis cli
```shell
redis-cli
```
4. store a key value pair
```shell
SET user "tushar"
```
5. get a value
```shell
GET user
```
6. delete a key
```shell
DEL user
```

> [!tip]
> HSET/HGET/HDEL - store multiple values for single key - if you want to store different data for user with different id.


Redis as a queue
```shell
LPUSH problem 1 
LPUSH problem 2 
RPOP problem 
RPOP problem 

// blocking pop - will be blocked for t seconds till a value is pushed (t = 0 for infinite)
BRPOP problem t 
```

### Postgres
1. start postgres in detached mode
```shel
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
`postgresql://postgres:mysecretpossword@localhost:5432/postgres` -> url to access postgres
### Kafka 
```shell
docker run -d --name kafka-zk \
  -e ALLOW_PLAINTEXT_LISTENER=yes \
  -e KAFKA_CFG_ZOOKEEPER_CONNECT=localhost:2181 \
  -p 9092:9092 -p 2181:2181 \
  bitnami/kafka:latest
```
```
docker stop kafka-zk && docker rm kafka-zk
```
