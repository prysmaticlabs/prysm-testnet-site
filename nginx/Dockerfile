# docker build . -t gcr.io/prysmaticlabs/prysm/testnet-proxy-cache:lates
FROM nginx:1.16.0-alpine

COPY default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]

