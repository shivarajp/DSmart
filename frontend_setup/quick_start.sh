#!/usr/bin/env bash

# make sure everything is clean and well setup
./first_time_setup.sh

# start frontend react app
./start_frontend.sh &
P1=$!

# wait $P1
wait $P1
