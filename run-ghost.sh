#!/bin/bash

useradd ghost --home /ghost
chown -R ghost:ghost /ghost

su ghost -c "cd /ghost && npm start"
