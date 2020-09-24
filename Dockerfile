FROM node:12.18.4-alpine3.12

WORKDIR /usr/src/app
ADD ./ /usr/src/app/

RUN ["chmod", "+x", "/usr/src/app/tasks/test-e2e.sh"]
ENTRYPOINT [ "/usr/src/app/tasks/test-e2e.sh" ]