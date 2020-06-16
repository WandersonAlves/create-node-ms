FROM astefanutti/scratch-node
ENV NODE_ENV production
COPY ./build ./

# COPY .env .env

EXPOSE 3000
ENTRYPOINT [ "node", "./build.js" ]