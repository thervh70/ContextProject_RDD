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

cp -u resources/* build/octopeer-github
echo "Copied resources"

echo "Transpiling TypeScript..."
npm run-script tsc > /dev/null && cp build/main.js build/octopeer-github/main.js
cursor_up
echo "Transpiled TypeScript"