# ContextProject_RDD
[![Stories in Ready](https://badge.waffle.io/thervh70/ContextProject_RDD.png?label=ready&title=Ready)](http://waffle.io/thervh70/ContextProject_RDD)
[![Build Status](https://travis-ci.org/thervh70/ContextProject_RDD.svg?branch=master)](https://travis-ci.org/thervh70/ContextProject_RDD)

### Documents
- [Definition of Done](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Definition_of_Done.pdf)
- [Sprint backlog 1](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog1.pdf)

- Research Documents:
  - [Frameworks](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/research/Research_Frameworks.pdf)
  - [IDE](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/research/Research_IDE.pdf)
  - [Static Analysis Tools](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/research/Research_Static_Analysis_Tools.pdf)

- [Product Vision](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Product_Vision_Document.pdf)
- [Product Planning](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Product_Planning_Document.pdf)
- [Architecture Design Document](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Architecture_Design_Document.pdf)


All documents can in general be found in the doc folder.

### Setup
- Download [WebStorm](https://www.jetbrains.com/webstorm/)
- Download [Nodejs](https://nodejs.org/en/download/)
- Use WebStorm (or Git knowledge) to clone the repo to a local folder
- Run `npm install`
- Run `npm test` to check whether works correctly

Congratulations, you can now start developing!

### Building and Installing the Extension
- Run `build.sh` to build the extension
  - `build.sh clean` empties the build directory before building
- In the Chrome menu, go to "More Tools" > "Extensions"
- In the top-right, check "Developer mode"
- Click "Load unpacked extension..."
- Select "$PROJECT_FOLDER/build/octopeer-github"

The extension is now loaded in Chrome.
