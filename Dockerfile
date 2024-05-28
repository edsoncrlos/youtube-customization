FROM node:18-alpine As build

RUN node:18-alpine npm -v # should print `10.7.0`

RUN npm i

COPY . .

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start" ]
