#!/usr/bin/env bash

cd src

rm npm-debug.log

cp ../README.md .
cp ../package.json .
cp ../LICENSE .

npm publish

rm README.md package.json LICENSE

cd ..
