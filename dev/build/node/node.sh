#!/bin/bash

cd /bud
git checkout $bud_branch
yarn
yarn build

cd /sage
git checkout $sage_branch
ln -s /bud/node_modules/@roots node_modules/@roots
yarn
yarn build --ci
