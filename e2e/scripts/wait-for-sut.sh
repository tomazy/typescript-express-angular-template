#!/bin/bash

: ${SUT_URL:=http://localhost:3000/}

echo "Waiting for SUT... (${SUT_URL})"

until $(curl --output /dev/null --silent --head --fail $SUT_URL); do
	printf '.'
  sleep 0.3
done
