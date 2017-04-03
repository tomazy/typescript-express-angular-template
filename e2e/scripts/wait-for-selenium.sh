#!/bin/bash

if [ -z "$SELENIUM_ADDRESS" ]; then exit 0; fi

echo "Waiting for selenium... (${SELENIUM_ADDRESS})"

until $(curl --output /dev/null --silent --head --fail $SELENIUM_ADDRESS); do
	printf '.'
  sleep 0.3
done
