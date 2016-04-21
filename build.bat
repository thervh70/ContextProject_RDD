if not exist "build/octopeer-github" mkdir build\octopeer-github
cp -u resources/* build/octopeer-github
npm run-script tsc && cp build/main.js build/octopeer-github/main.js
