#!/usr/bin/env bash

function cursor_up {
    echo -ne "\033[1A\033[K"
}

if [ "$1" == "clean" ]; then
    rm -R build/*
	echo "Cleaned build directory"
fi
if [ ! -d "build/resources" ]; then
    mkdir build/resources
fi
if [ ! -d "build/analytics" ]; then
    mkdir build/analytics
fi
if [ ! -d "build/libs" ]; then
    mkdir build/libs
fi

cp -u -r resources/* build/resources
mv build/resources/manifest.json build/manifest.json
cp -u -r analytics/src/* build/analytics
cp -u -r analytics/libs/* build/libs
echo "Copied resources"

echo "Transpiling TypeScript..."
npm run-script tsc > /dev/null
cursor_up
echo "Transpiled TypeScript"

echo "Copied dependencies"
