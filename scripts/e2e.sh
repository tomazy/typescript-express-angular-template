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

# Exit the script with a helpful error message when any error is encountered
trap 'set +x; handle_error $LINENO $BASH_COMMAND' ERR

# Cleanup before exit on any termination signal
trap 'set +x; handle_exit' SIGQUIT SIGTERM SIGINT SIGKILL SIGHUP

# Echo every command being executed
# set -x

echo 'Starting the backend'
cd backend
npm run build
PORT=$BACKEND_PORT npm run start:e2e > $BACKEND_LOG 2>&1 &
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

echo "Running the specs"
cd frontend
npm run e2e

cleanup
