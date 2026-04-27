docker pull node:18.20-alpine

docker image tag node:18.20-alpine btmv-purchased-request-service:latest

cp ./.env.example ./.env

npm install

docker compose -f docker-compose.dev.yml up -d 