#!/bin/bash

set -x
set -e

export PROJECT_NAME=sample_stack
INITIAL_PATH=$PWD
RELEASE_DIR=$PWD/.release
export DEV_IMAGE_NAME=$PROJECT_NAME/dev
export RELEASE_IMAGE_NAME=$PROJECT_NAME/release

# build sample_stack/node-chrome image (frontend image depends on it)
./docker/node-chrome/build.sh

# build the development image. We use it for building the app and running tests
docker build -f Dockerfile.dev -t $DEV_IMAGE_NAME .

# prepare the release
rm -fr $RELEASE_DIR
mkdir -p $RELEASE_DIR

# extract frontend part of the app from docker container
docker run --rm $DEV_IMAGE_NAME tar czf - /app/frontend/dist > $RELEASE_DIR/frontend.tgz

# extract backend part of the app from docker container
docker run --rm $DEV_IMAGE_NAME tar czf - /app/backend/dist /app/backend/node_modules /app/backend/package.json > $RELEASE_DIR/backend.tgz

# run the tests
docker run --rm $DEV_IMAGE_NAME npm run test:ci

cd $RELEASE_DIR

# put frontend static files into /app/wwwroot
tar xzf frontend.tgz
mv app/frontend/dist app/wwwroot
rm -fr app/frontend
rm frontend.tgz

# extract backend
tar xzf backend.tgz
mv app/backend/* app/
rm -fr app/backend
rm backend.tgz

# build the release image
cp ../docker/Dockerfile.release Dockerfile
docker build -t $RELEASE_IMAGE_NAME .

cd $INITIAL_PATH

DOCKER_COMPOSE="docker-compose -p ${PROJECT_NAME} -f docker-compose.yml -f docker-compose.e2e.yml"

# run the e2e tests
$DOCKER_COMPOSE run --rm e2e-runner

# stop all
$DOCKER_COMPOSE down --remove-orphans

echo 'We are ready to deploy!'
