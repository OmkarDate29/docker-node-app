```
docker build -t <image_name> .
docker network create <network_name>
docker run -p 27017:27017 --name <mongo_image_name> --network <network_name> mongo:latest
docker run -it -p 3000:3000 -v <absolute_path>:/app --name node-app --network <network_name> <image_name>
```
