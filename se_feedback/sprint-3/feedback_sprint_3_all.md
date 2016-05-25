|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Sprint 3|
|Date|22/05/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 3.

Total: **10**

| User Story | Score |
|------------|-------|
| definition | 10    |
| splitting  | 10    |
| responsibility | 10 |

| Learning from History | Score |
|-----------------------|-------|
| estimation            | 10    |
| prioritisation        | 10    |
| reflection            | 10    |

## Notes
* Make sure Youri catches up on hours if necessary
* Nicely done and keep this up 

#Code Evolution Quality Feedback

Total: **8.13**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |  7    |
| Architecture Design Document (ADD) |  8    |

|                     | Score |
|---------------------|-------|
| Code Change Quality |  7    |

| Code Readability | Score |
|------------------|-------|
| Formatting       | 10    |
| Naming           |  8    |
| Comments         | 10    |

| Continuous Integration | Score |
|------------------------|-------|
| Building               | 8     |
| Testing                | 7     |

|         | Score |
|---------|-------|
| Tooling | 7     |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              | 10     |
| Code Review            | 10     |

##Notes
* Make sure you get the testing and coverage tools all setup (discussed this on Tuesday as well)
* ADD
	* What are not-yet-existing tabs?
	* Why is Status a singleton?
	* The Status class has no dependencies on itself?
	* Why Observer pattern?
	* Thanks for adding the text with software-hardware mapping
	* Good explanation of how to handle incognito mode
	* Add Singleton pattern to the glossary as well
* `Status`
	* Is not implemented as a Singleton, simply having one instance does not mean that you implement this design pattern
	* MainController instantiates a single instance but Status can be created more than once
* `MainController`
	* `connectToContentScript`
		* comments separating code indicate the need to split this function into smaller functions
		* `testAndSend` is a good example of how to move functionality to smaller functions
* `RESTApiDatabaseAdapter`
	* Is formatting urls a responsibilty of this class?
	* `createJSONPost` good split of functionality since it's used in 2 different places
* `DatabaseAdaptable`
	* `EventObject` is used by the DatabaseAdaptable but why not it's own file?
	* function `EventObject` is a Simple Factory
		* Shorthands are useful but usually end up confusing future developers
		* Consider moving to it's own file and renaming
			* The advantage is that you can add more functions that make it easier to create certain EventObjects without loosing clarity
* `Settings`
	* `peer_comments` seems to be inconsistently named because of the underscore while camelcase is used everywhere else
	* All functions have a similar structure, is it possible to call a common function with parameters?
* `InternalSettings` is an empty class?