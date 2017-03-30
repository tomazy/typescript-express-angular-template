#!/bin/bash

echo "Waiting for selenium... (${SELENIUM_ADDRESS})"

until $(curl --output /dev/null --silent --head --fail $SELENIUM_ADDRESS); do
	printf '.'
  sleep 0.3
done
