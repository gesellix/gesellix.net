FROM node:0.10

EXPOSE 2368

ENV NODE_ENV production
CMD ["npm", "start", "--production"]

WORKDIR /ghost/

VOLUME ["/ghost/content/data"]
VOLUME ["/ghost/content/images"]

ADD ./package.json /ghost/package.json
RUN useradd ghost --home /ghost && \
    cd /ghost/ && \
    npm install --production

ADD ./config.js /ghost/config.js
ADD ./index.js /ghost/index.js
ADD ./content/ /ghost/content/

RUN chown -R ghost:ghost /ghost
