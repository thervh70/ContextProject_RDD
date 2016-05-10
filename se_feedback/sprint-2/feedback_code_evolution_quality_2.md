|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Code Evolution Quality 2|
|Date|10/05/16|
|TA|Bastiaan Reijm|

#Feedback

Total: 7.42

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            | 7     |
| Architecture Design Document (ADD) | 7     |

|                     | Score |
|---------------------|-------|
| Code Change Quality | 7     |

| Code Readability | Score |
|------------------|-------|
| Formatting       | 8     |
| Naming           | 8     |
| Comments         | 8     |

| Continuous Integration | Score |
|------------------------|-------|
| Building               | 8     |
| Testing                | 7     |

|         | Score |
|---------|-------|
| Tooling | 7     |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              | 8     |
| Code Review            | 8     |

##Notes
* Good start on the ADD, still missing some code in order for the two to match up
* `DatabaseAdaptable` both functions take a large (6-8) parameters
	* reduce these if possible
	* also the functionality in this class seems to suggest this is a logging class
		* writeToDatabase may be better suited as function names
* `DatabaseAdapter` can be better named to something that reflects it's the Adaptable specifically for Aaron's REST api
	* Suggestion: DefaultDatabaseAdapter 
* `DatabaseConsoleLogOnly` is oddly named and is inconsistent with other names
	* Suggestion: ConsoleOnlyDatabaseAdapter
* Add the output of your tools to GitHub either by:	* uploading at the end of the Sprint to reflect the current state
	* via travis each time a build is run 