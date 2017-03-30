#!/bin/bash

NAME=sample_stack/node-chrome

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

docker build -f $DIR/Dockerfile -t $NAME $DIR
