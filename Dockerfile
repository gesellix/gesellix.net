FROM gesellix/node

RUN apt-get install -y build-essential && apt-get clean && rm -rf /tmp/* /var/tmp/*

RUN mkdir -p /opt/ghost

ADD ./ghost/package.json /opt/ghost/package.json
RUN cd /opt/ghost && /opt/node/bin/npm install

ADD ./ghost /opt/ghost

WORKDIR /opt/ghost

# using the volumes with a dedicated data container:
#  docker run -d -v /opt/ghost/content/data -v /opt/ghost/content/images --name ghost-data ubuntu:14.04 true
#  docker run -d --volumes-from ghost-data -p 2368:2368 gesellix/gesellix.net
VOLUME ["/opt/ghost/content/data"]
VOLUME ["/opt/ghost/content/images"]

EXPOSE 2368

CMD ["/opt/node/bin/npm", "start"]
