ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS production
COPY . .
RUN npm prune --production
CMD ["npm", "start"]
