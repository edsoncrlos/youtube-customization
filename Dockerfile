FROM ubuntu:latest As build

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

COPY . .

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start" ]
