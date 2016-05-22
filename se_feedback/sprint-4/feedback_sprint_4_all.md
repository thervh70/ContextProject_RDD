|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Sprint 4|
|Date|22/05/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 4.

Total: **9.5**

| User Story | Score |
|------------|-------|
| definition | 10    |
| splitting  | 10      |
| responsibility | 10  |

| Learning from History | Score |
|-----------------------|-------|
| estimation            | 10    |
| prioritisation        | 10    |
| reflection            | 8    |

## Notes
* Well done 
* Keep the Done category binary
	* Almost and partially essentially mean no
* You mention SIG but there's also a Mid-term review with Alberto

#Code Evolution Quality Feedback

Total: **8.88**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            | 8     |
| Architecture Design Document (ADD) | 8     |

|                     | Score |
|---------------------|-------|
| Code Change Quality | 9      |

| Code Readability | Score |
|------------------|-------|
| Formatting       | 10     |
| Naming           | 8     |
| Comments         | 10     |

| Continuous Integration | Score |
|------------------------|-------|
| Building               | 10     |
| Testing                | 7     |

|         | Score |
|---------|-------|
| Tooling | 10     |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |  10    |
| Code Review            |  10    |

##Notes
* ADD
	* Good class diagram
	* A sequence diagram of how the user interacts with the options would be useful to add
	* A sequence diagram of how the MainController interacts with the ContentController would make the textual explanation clearer
	* A sequence diagram of how data is collected while a user is browsing a pr would make the textual explanation clearer
	* Why is the Options class a Singleton?
	* A flow diagram of how the `ContentController` deals with `ElementSelectionBinding` objects would be useful
	* A class diagram how of the `ElementSelectionBehaviour` hierarchy would also be useful
* `Status`
	* Excellent fix of the Singleton implementation! 
* `Options`
	* Good to see you applied the same technique to make the class Singleton
	* Lot's of attributes (8) of type Boolean
		* Get methods for each attribute
		* How much work is it to add a new setting
		* Consider using a Map and enums
	* Should also be able to remove an observer for clean code purposes
* `DoNotWatchOptions` seems incomplete but there are no To Do tags
	* Hardcoded pairs of events
		* Create a settings file or object that can hold these
* `ContentController`
	* Consider moving large lists to a separate class or settings file
	* `hookToDOM`
		* Lines 142 / 149 - 153, these if conditions seems like good candidates for functions in the `DoNotWatchOptions` class
* Event and Element IDs are magic number constants hidden in Constructors
	* You have a documented table of these IDs, once this is finalised I suggest looking into putting these as consts in files so that the information is available in one place in the code as well