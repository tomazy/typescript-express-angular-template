#!/bin/bash
function cleanup {
  echo 'Cleaning up.'
  kill $BACKEND_PID
  cd $INITIAL_PATH
}

function handle_error {
  cleanup
  echo "$(basename $0): ERROR! An error was encountered executing line $1"
  echo 'Exiting with error.'
  exit 1
}

function handle_exit {
  cleanup
  echo 'Exiting without error.'
  exit
}

INITIAL_PATH=$PWD

BACKEND_PORT=3333
BACKEND_HEARTBEAT_URL=http://localhost:$BACKEND_PORT/_heartbeat
BACKEND_LOG=/tmp/test-backend.log

export SUT_URL=http://localhost:$BACKEND_PORT
export MONGODB_PORT=27018
export MONGODB_HOST=localhost
export MONGODB_DATABASE=e2e
export MONGODB_URI=mongodb://$MONGODB_HOST:$MONGODB_PORT/$MONGODB_DATABASE

# Exit the script with a helpful error message when any error is encountered
trap 'set +x; handle_error $LINENO $BASH_COMMAND' ERR

# Cleanup before exit on any termination signal
trap 'set +x; handle_exit' SIGQUIT SIGTERM SIGINT SIGKILL SIGHUP

# Echo every command being executed
# set -x

echo "Starting test mongodb server"
./scripts/start-mongodb-dev-e2e.sh -d

echo 'Starting the backend'
cd backend
npm run build
PORT=$BACKEND_PORT npm start > $BACKEND_LOG 2>&1 &
BACKEND_PID=$!
cd $INITIAL_PATH

echo "Waiting for the backend to become ready"
until $(curl --output /dev/null --silent --head --fail $BACKEND_HEARTBEAT_URL); do
	if kill -0 $BACKEND_PID; then
		printf '.'
		sleep 1
	else
		echo "!!! backend is not running!"
		cat $BACKEND_LOG
		exit 1
	fi
done
echo

cd $INITIAL_PATH/e2e
yarn install
echo "Running the specs"
npm run update-webdriver
npm run test

cleanup
