FROM gesellix/node

RUN apt-get update && apt-get install -y build-essential && apt-get clean && rm -rf /tmp/* /var/tmp/*

# get current Ghost release:
#  curl -L -O https://ghost.org/zip/ghost-latest.zip

RUN mkdir -p /opt/ghost

ADD ./ghost/package.json /opt/ghost/package.json
RUN cd /opt/ghost && /opt/node/bin/npm install --production

ADD ./ghost /opt/ghost

WORKDIR /opt/ghost

# using the volumes with a dedicated data container:
#  docker run -d -v /opt/ghost/content/data -v /opt/ghost/content/images --name ghost-data ubuntu:14.04 true
#  docker run -d --volumes-from ghost-data -v `pwd`/config.js:/opt/ghost/config.js -p 2368:2368 gesellix/gesellix.net

# create a data container backup:
#  docker run --volumes-from ghost-data -v `pwd`:/backup ubuntu:14.04 tar cfvz /backup/ghost-data.tgz /opt/ghost/content/data
#  docker run --volumes-from ghost-data -v `pwd`:/backup ubuntu:14.04 tar cfvz /backup/ghost-images.tgz /opt/ghost/content/images

# restore a container backup:
#  docker run --volumes-from ghost-data -v `pwd`:/backup ubuntu:14.04 tar xfvz /backup/ghost-data.tgz
#  docker run --volumes-from ghost-data -v `pwd`:/backup ubuntu:14.04 tar xfvz /backup/ghost-images.tgz

VOLUME ["/opt/ghost/content/data"]
VOLUME ["/opt/ghost/content/images"]

EXPOSE 2368

CMD ["/opt/node/bin/npm", "start", "--production"]
