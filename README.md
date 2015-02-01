# gesellix.net

* :whale: [Docker](https://www.docker.com/) image available at the [official registry](https://registry.hub.docker.com/u/gesellix/gesellix.net/) via `docker pull gesellix/gesellix.net`.

* instructions for using the Ghost npm module: [GitHub wiki](https://github.com/TryGhost/Ghost/wiki/Using-Ghost-as-an-npm-module)

* using the volumes with a dedicated data container:

    ```
    docker run -v /ghost/content/data -v /ghost/content/images --name gesellix-data gesellix/gesellix.net true
    docker run -d --volumes-from gesellix-data -p 2368:2368 gesellix/gesellix.net
    #docker run -d --volumes-from gesellix-data -v `pwd`/config.js:/opt/ghost/config.js -p 2368:2368 gesellix/gesellix.net
    ```
* create a data container backup:

    ```
    docker run --volumes-from gesellix-data -v `pwd`:/backup gesellix/gesellix.net tar cvzf /backup/gesellix.net-data.tgz /ghost/content/data
    docker run --volumes-from gesellix-data -v `pwd`:/backup gesellix/gesellix.net tar cvzf /backup/gesellix.net-images.tgz /ghost/content/images
    ```
* restore a container backup:

    ```
    docker run --volumes-from gesellix-data -v `pwd`:/backup gesellix/gesellix.net tar xvzf /backup/gesellix.net-data.tgz
    docker run --volumes-from gesellix-data -v `pwd`:/backup gesellix/gesellix.net tar xvzf /backup/gesellix.net-images.tgz
    ```
