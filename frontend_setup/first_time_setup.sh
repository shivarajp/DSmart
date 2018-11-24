#!/usr/bin/env bash

echo "=== start of first time setup ==="

# change to script's directory
cd "$(dirname "$0")"
SCRIPTPATH="$( pwd -P )"

# set up node_modules for frontend
echo "=== npm install packpage for frontend react app ==="
# change directory to ./frontend
cd "$SCRIPTPATH/frontend"
npm install
