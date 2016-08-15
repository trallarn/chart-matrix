#!/bin/bash

# Copies artifacts to dist-folder and copies it to remote server

./build-dist.sh

scp -r dist/* pi:/var/www/finance/
