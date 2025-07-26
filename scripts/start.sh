#!/bin/bash

cd /home/ubuntu

. ./.env

cd /home/ubuntu/server/app

pm2 delete all

pm2 start dist/src/main.js --name seolim-server
