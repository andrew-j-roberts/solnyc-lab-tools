#!/bin/bash
# test shell script for shelljs 8-)
# - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + -

echoerr() { echo "$@" 1>&2; }

echo "Stdout - test 1"
sleep 1
echoerr "Stderr - test 1"
sleep 1
echo "Stdout - test 2"
sleep 1
echoerr "Stderr - test 2"