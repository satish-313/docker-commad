# docker-commad

1.  To download docker image from docker hub
    $ sudo docker pull 'image name', example sudo docker pull postgres

2.  To run the docker image 
    $ sudo docker run 'image run', example sudo docker run postgres

3.  To show the all container running on machine
    $ sudo docker ps

4.  To see the all image in docker 
    $ sudo docker images

5.  To see run an image 
    $ sudo docker run image-name (we can avoid the sudo by changing some stuff by creating su user)

    creating su user 
    1. $ sudo usermod -aG docker ${USER}
    2. $ su - ${USER}
    promt the password enter password
    3. to known $ id -nG

6.  In docker must common term I heard is container.Here i will try to explain,
    what is container ? 
    ans - A container is an isolated system, it's contains all the packages and necessary depedencies and configuration. It can be easily shared and moved around. It's work in any system, it's make developement and deployment much easier.

7.  In docker two term hear commonly, image and container. First is image is an 
    actual package contains all dependencies and configuration and moveble. A container is a application that stared or running. easily when image will run called a container vise-vesa. That mean when an actual application will be push in repository it will first convert into image(letter we learn the how to build image).

8.  Must of container live on repository. repository can be public and private.
    must of public container present in dockerhub like radis,postgres etc...

    -: BASIC COMMAND :-
    to pull an image 
    $ docker pull <image_name>:version-type(alpine)
    $ docker pull postgres:13.4-alpine

    to check all images
    $ docker images

    to run an image 
    $ docker run <image_name>:version
    $ docker run redis or $ docker run redis:6.5.4-alpine

    to delete image
    $ docker rmi <image_name>:version or $ docker rmi <image_id>
    $ docker rmi 1478cbf259c5
    (some time it will not remove if this image layer used to other image of same repository. to remove this we have to remove new images)

    to delete depend image
    $ docker rmi -f <image_id>

    if you command above method, it will run the container in a attach mode mean when we close the terminal it will stop. To avoid these issue we will run the container in deattach mode
    $ docker run -d <image_name>:version or tags
    $ docker run -d redis

    *Some application or image might not work. For example when i tried to run postgres the throw some error like database is uninitialized required password

    $ docker run --name <someName> -e POSTGRES_PASSWORD=<somePassword> run postgres:tags
    $ docker run --name postgres -e POSTGRES_PASSWORD=postgres postgres:alpine

    to check all the docker container
    $ docker ps

    to stop the container
    $ docker stop <container id>
    $ docker stop c99a !no need to write whole container id

    to start container again
    $ docker start <container id>

    on above commad we need to know what is container id. when we use docker ps it will be empty or not that container.
    to see all stop and working container
    $ docker ps -a

    docker container remove 
    $ docker rm <container id>

    Multiple docker container running at same time and same type.
    for example when we run  two different or same version of redis at same time or example a microservise use two same container. their output post is same in that suitution. then host machine show the port already take. for that we need to change binding post to host.

    binding host port to container port
    $ docker run -d -p<host port>:<container port> <image name>
    $ docker run -d -p5000:6379 redis:6.2.1-alpine

9.  Troubleshooting on docker container if any thing wrong

    to see the docker logs
    $ docker logs <container_id> or docker logs <container_name>
    $ docker logs docker logs recursing_noyce

    to change docker container name
    $ docker --name <your_name> <image_name>:<image_tags>
    $ docker run -d -p8080:6379 --name redis_alpine redis:6.2.1-alpine

    another usefull docker debug is to goto docker command
    $ docker exec -it(interactive terminal) <container_id>
    $ docker exec -it 420bd042dee1 /bin/bash or docker exec -it 420bd042dee1 /bin/sh

11. Docker network
    docker create an isolated network between different docker container
    to communicate between different docker application it need only container name not like port when connecting to host port network

    to see docker network 
    $ docker network ls

    to create docker network
    $ docker network create <network_name>
    $ docker network create test_network

10. Demo project:-
    
    running mongodb 
    $ docker run -d \    note -- \ for next line -e for env variable
    > -p 27017:27017 \
    > -e MONGO_INITDB_ROOT_USERNAME=admin \
    > -e MONGO_INITDB_ROOT_PASSWORD=admin \
    > --name mongodb \
    > --network mongo-network \
    > mongo:4.2.16-rc0-bionic

    docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin --name mongodb --network mongo-network mongo:4.2.16-rc0-bionic

    running mongo-express
    $ docker run -d \
    > -p 8081:8081 \
    > -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    > -e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
    > -e ME_CONFIG_MONGODB_SERVER=mongodb \
    > --name mongo-express \
    > --network mongo-network \
    > mongo-express:1.0.0-alpha.4

    docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=admin -e ME_CONFIG_MONGODB_SERVER=mongodb --name mongo-express --network mongo-network mongo-express:1.0.0-alpha.4

11. Docker compose
    as above code shows, if our application is big or complicate stuff it become tidious. To improve above method become much easier we use docker-compose.yaml

    consist parameter in docker-compose.yaml
    version : '3' 
    /* 
    	this is docker-compose version https://docs.docker.com/compose/compose-file/ 
			for my case my docker version is 20.10.7 my compose version '3'   
    */
		services:
    /* 
      all container like mongodb,node
    */
			mongodb:
				image: mongo:4.2.16-rc0-bionic
				port: 
					- '27017':'27017'
				environment:
					MONGO_INITDB_ROOT_USERNAME=admin
					MONGO_INITDB_ROOT_PASSWORD=admin

			mongo-express:
				image : mongo-express:1.0.0-alpha.4
				port:
					- '8081:8081'
				environment:
					ME_CONFIG_MONGODB_ADMINUSERNAME=admin
					ME_CONFIG_MONGODB_ADMINPASSWORD=admin
					ME_CONFIG_MONGODB_SERVER=mongodb
    
    note that we didn't create the network. docker compose automatic create the network for all services
	
    to use docker compose file
    $ docker-compose <file_name> up
		$ docker-compose -f compose-demo.yaml up






