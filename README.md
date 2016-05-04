# ContextProject_RDD
[![Stories in Ready](https://badge.waffle.io/thervh70/ContextProject_RDD.png?label=ready&title=Ready)](http://waffle.io/thervh70/ContextProject_RDD)
[![Build Status](https://travis-ci.org/thervh70/ContextProject_RDD.svg?branch=master)](https://travis-ci.org/thervh70/ContextProject_RDD)

### Documents
- [Definition of Done](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Definition_of_Done.pdf)
- Sprint backlogs:
  - [1](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog1.pdf)
  - [2](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog2.pdf)
- Sprint retrospectives:
  - [1](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-1.pdf)

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
  - To also clone the submodule "DefinitelyTyped", use `git submodule update --init`
- Run `npm install`
- Run `npm test` to check whether works correctly

Congratulations, you can now start developing!

The next section will continue with applying Static Analysis Tools to WebStorm.

### Tooling (SAT)
**Installing and activating TSLint:**
- Run `npm install -g tslint`.
- Within WebStorm, open the Settings / Preferences Dialog by
  - (for Windows and Linux) clicking on the 'File' tab and then 'Settings'.
  - (for OS X) clicking on the 'WebStorm' tab and then 'Preferences'.
  - the shortcut: ctrl + alt + s.
- Go to 'Languages & Frameworks' and click on 'TypeScript' and then on 'TSLint'.
- In the area that shows up, select the 'Enable' check box.

The default settings within this enabled area are sufficient, so apply the changes and close the window.

You've now activated TSLint.


**Installing and using MaDGe (dependency tool):**
- Run `npm install madge` (library)
- Run `npm -g install madge` (command-line tool)
- Run `madge` for using MaDGe (it will return all options)
- Run (for example) `madge -f amd -c ./src` for checking circular dependencies within the source code.
- (Optional) GraphViz can be used for visualizing the results.

More examples can be found [here](https://github.com/pahen/madge).

### Building and Installing the Extension
- Run `build.sh` to build the extension
  - `build.sh clean` empties the build directory before building
- In the Chrome menu, go to "More Tools" > "Extensions"
- In the top-right, check "Developer mode"
- Click "Load unpacked extension..."
- Select "$PROJECT_FOLDER/build/octopeer-github"

The extension is now loaded in Chrome.
