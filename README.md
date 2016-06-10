# ContextProject_RDD
[![Stories in Ready](https://badge.waffle.io/thervh70/ContextProject_RDD.png?label=ready&title=Ready)](http://waffle.io/thervh70/ContextProject_RDD)
[![Build Status](https://travis-ci.org/thervh70/ContextProject_RDD.svg?branch=master)](https://travis-ci.org/thervh70/ContextProject_RDD)
[![Coverage Status](https://coveralls.io/repos/github/thervh70/ContextProject_RDD/badge.svg?branch=master)](https://coveralls.io/github/thervh70/ContextProject_RDD?branch=master)

### Documents
- [Definition of Done](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Definition_of_Done.pdf)
- Sprint backlogs:
  - [1](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog1.pdf)
  - [2](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog2.pdf)
  - [3](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog3.pdf)
  - [4](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog4.pdf)
  - [5](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog5.pdf)
  - [6](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog6.pdf)
  - [7](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog7.pdf)
  - [8](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Sprint_Backlog8.pdf)


- Sprint retrospectives:
  - [1](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-1.pdf)
  - [2](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-2.pdf)
  - [3](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-3.pdf)
  - [4](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-4.pdf)
  - [5](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-5.pdf)
  - [6](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-6.pdf)
  - [7](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/SprintRetrospective-7.pdf)


- Research Documents:
  - [Frameworks](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/research/Research_Frameworks.pdf)
  - [IDE](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/research/Research_IDE.pdf)
  - [Static Analysis Tools](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/research/Research_Static_Analysis_Tools.pdf)
  - [Hint Generation](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/research/Research_Hint_Generation.pdf)

- [Product Vision (final)](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Final_Product_Vision.pdf)
- [Product Planning (final)](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Final_Product_Planning.pdf)
- [Architecture Design Document](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Architecture_Design_Document.pdf)
- [Test Report](https://github.com/thervh70/ContextProject_RDD/blob/master/doc/Test_Report.pdf)


All documents can in general be found in the doc folder.

### Setup
- Download [WebStorm](https://www.jetbrains.com/webstorm/)
- Download [Nodejs](https://nodejs.org/en/download/)
- Use WebStorm (or Git knowledge) to clone the repo to a local folder
- Run `npm install`
- Run `npm run-script travis` to check whether everything works correctly
- Run `git submodule init && git submodule update --recursive` to make the analytics work

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

### Coverage
- The `npm test` command will generate a `coverage-final.json` file.
- Run `npm run-script coverage` to generate a html coverage report of the json coverage file.
- You can now view the coverage report by opening `coverage/html/index.html`. This html file gives a nice overview of the coverage of the source code.

### Building and Installing the Extension
- Run `build.sh` to build the extension
  - `build.sh clean` empties the build directory before building
- In the Chrome menu, go to "More Tools" > "Extensions"
- In the top-right, check "Developer mode"
- Click "Load unpacked extension..."
- Select "$PROJECT_FOLDER/build"

The extension is now loaded in Chrome.

### Adding new type definitions for dependencies
 - For every new dependency, run `typings install --ambient --save <package-name>`
 - The type definitons should now automatically be included via the TypeScript configuration files

### Acknowledgments
We would like to thank [PixelKit](http://pixelkit.com/) for allowing us to use and modify the lightbulb icon. It was released with the [CC Attribution 4.0](http://creativecommons.org/licenses/by/4.0/) licencse.
