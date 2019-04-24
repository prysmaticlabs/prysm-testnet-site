# docker build -t gcr.io/prysmaticlabs/prysm-testnet-site:latest .

### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:9-alpine as builder

RUN apk update && apk upgrade && \
    apk add --no-cache git python make g++

COPY package.json package-lock.json ./


## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i -g npm@6.4
RUN npm ci 
RUN mkdir /ng-app && mv ./node_modules ./ng-app/

## Move to /ng-app (eq: cd /ng-app)
WORKDIR /ng-app


# Copy everything from host to /ng-app in the container
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
ARG NG_ENV=production
RUN npm run ng build -- --configuration=$NG_ENV


### STAGE 2: Setup ###

FROM nginx:1.16.0-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/prysm-testnet-site /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
