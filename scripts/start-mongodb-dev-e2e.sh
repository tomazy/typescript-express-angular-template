#!/bin/bash
set -ex
: ${MONGODB_PORT:=27018}

NAME=mongo-dev-e2e
DATA_DIR=`pwd`/.data-dev-e2e

CONTAINER_ID=`docker ps | grep $NAME | awk '{print $1}'`

if [[ $CONTAINER_ID ]]
then
  docker kill $CONTAINER_ID
fi

mkdir -p $DATA_DIR
docker run --rm --name $NAME -p $MONGODB_PORT:27017 $* mongo:latest
