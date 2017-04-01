#!/bin/bash
set -ex

NAME=${PROJECT_NAME:-sample_stack}/node-chrome

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

docker build -f $DIR/Dockerfile -t $NAME $DIR
