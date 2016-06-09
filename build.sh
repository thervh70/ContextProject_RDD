#!/usr/bin/env bash

function cursor_up {
    echo -ne "\033[1A\033[K"
}

if [ "$1" == "clean" ]; then
    rm -R build/octopeer-github
	echo "Cleaned build directory"
fi
if [ ! -d "build/octopeer-github" ]; then
    mkdir build/octopeer-github
fi
if [ ! -d "build/octopeer-github/analytics" ]; then
    mkdir build/octopeer-github/analytics
fi
if [ ! -d "build/octopeer-github/libs" ]; then
    mkdir build/octopeer-github/libs
fi

cp -u -r resources/* build/octopeer-github
cp -u -r TI2806/src/* build/octopeer-github/analytics
cp -u -r TI2806/libs/* build/octopeer-github/libs
echo "Copied resources"

echo "Transpiling TypeScript..."
npm run-script tsc > /dev/null && cp build/main.js build/octopeer-github/main.js && cp build/content.js build/octopeer-github/content.js
cursor_up
echo "Transpiled TypeScript"

cp node_modules/jquery/dist/jquery.min.js build/octopeer-github/jquery.min.js
cp node_modules/materialize-css/dist/js/materialize.min.js build/octopeer-github/materialize.min.js
echo "Copied dependencies"
