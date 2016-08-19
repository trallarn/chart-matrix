#!/bin/bash

# Copies artifacts to dist-folder and copies it to remote server
# Run as: ./deploy.sh <|user@server>
# where empty arg deploys to pi

HOST=$1

./build-dist.sh

# Set destination
DEST=$(test $HOST && echo $HOST || echo "pi" )
DEST="$DEST:/var/www/chartmatrix/"

echo "Copying to destination $DEST"
scp -r dist/* $DEST
