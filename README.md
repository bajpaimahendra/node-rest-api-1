### Project setup

	--- Only node is inside docker container, need to  install mongodb on host machine
	-- Note : npm install <moduleName> ( always inside container )

	git clone https://github.com/bajpaimahendra/node-rest-api-1.git

	cd node-rest-api-1.git

	docker-compose up / docker-compose up --build


### Entering Docker containers

	docker ps (list all running containers)

	docker exec -it <container_name or container_id> bash

	docker exec -it <container_name or container_id> /bin/sh

### Exiting from Container
	exit

### Remove All Docker Containers

	docker container stop $(docker container ls -aq) && docker system prune -af --volumes



