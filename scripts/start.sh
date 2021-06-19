#!/bin/sh

if [ $NODE_ENV == "dev" ]; then
  source scripts/dev-start.sh
else
  source scripts/production-start.sh
fi
