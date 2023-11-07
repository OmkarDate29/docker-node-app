```
docker build -t node-image .
docker network create omkar
docker run -p 27017:27017 --name mongoDB --network omkar mongo
docker run -it -p 3000:3000 -v <absolute_path>:/app --name node-app --network omkar node-image
```
