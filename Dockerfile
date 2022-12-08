FROM node:19-alpine3.15

WORKDIR /usr/src/app
ADD ./ /usr/src/app/

RUN ["chmod", "+x", "/usr/src/app/tasks/test-e2e.sh"]
ENTRYPOINT [ "/usr/src/app/tasks/test-e2e.sh" ]