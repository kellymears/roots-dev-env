#!/bin/bash

cd /bud

yarn
yarn build

cd /sage

git checkout $branch

ln -s node_modules/@roots /bud/node_modules/@roots

yarn
yarn build --ci
