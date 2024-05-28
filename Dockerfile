FROM ubuntu:latest As build

RUN apt-get update
COPY . .
RUN apt-get install node

EXPOSE 8080

ENTRYPOINT [ "npm", "run" "start" ] 
