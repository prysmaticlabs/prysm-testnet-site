# docker build -t gcr.io/prysmaticlabs/prysm-testnet-site:latest .

FROM node:11-alpine as builder 

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
RUN npm run ng build --prod


############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /ng-app/dist/browser /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]