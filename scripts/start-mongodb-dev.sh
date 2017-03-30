#!/bin/bash
set -ex
: ${MONGODB_PORT:=27017}

NAME=mongo-dev
DATA_DIR=`pwd`/.data-dev

CONTAINER_ID=`docker ps | grep $NAME | awk '{print $1}'`

if [[ $CONTAINER_ID ]]
then
  docker kill $CONTAINER_ID
fi

mkdir -p $DATA_DIR
docker run --rm --name $NAME -p $MONGODB_PORT:27017 -v $DATA_DIR:/data/db $* mongo:latest
