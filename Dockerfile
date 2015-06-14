FROM node:0.10

EXPOSE 2368

ENV NODE_ENV production

WORKDIR /ghost/

ADD ./run-ghost.sh /ghost/run-ghost.sh
CMD ["bash", "-c", "/ghost/run-ghost.sh"]

VOLUME ["/ghost/content/data"]
VOLUME ["/ghost/content/images"]

ADD ./package.json /ghost/package.json
RUN npm install --production

ADD ./config.js /ghost/config.js
ADD ./index.js /ghost/index.js
ADD ./content/ /ghost/content/
