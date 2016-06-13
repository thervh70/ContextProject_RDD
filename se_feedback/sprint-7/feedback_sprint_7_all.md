|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Sprint 7|
|Date|12/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 7.

Total: ****

| User Story | Score |
|------------|-------|
| definition |     |
| splitting  |       |
| responsibility |   |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |     |
| prioritisation        |     |
| reflection            |    |

## Notes
* Good Job!
* Maarten's task "Implement the Logging Enabled Backend" was estimated to be 1 point but was a total effort of 8? What happened here?

#Code Evolution Quality Feedback

Total: ****

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |      |
| Architecture Design Document (ADD) |      |

|                     | Score |
|---------------------|-------|
| Code Change Quality |      |

| Code Readability | Score |
|------------------|-------|
| Formatting       |      |
| Naming           |      |
| Comments         |      |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |      |
| Testing                |      |

|         | Score |
|---------|-------|
| Tooling |      |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |      |
| Code Review            |      |

##Notes
* ADD
	* "Because the chrome storage is reliable" - can't argue with that logic, I would rephrase to the fact that your tool is as reliable as the Chrome Storage (cs). Let the reader draw there own conclusion on how reliable CS is.
	* Same comments as last time about security (http, options without implementation, etc)
* `GenericElementEventBinding`
	* private attributes that are only accessed but never modified?
* `MainController`
	* line 99 + 142 seem to be creating a large amount of database objects?
		* could cache these objects based on the `sender.tab.url`
	* line 99 - why store the new RESTApiDatabaseAdapter in `this.database` instead of passing to `this.postToDatabase` (line 100)
* `Status`
	* `setter` - unclear name, `applyStatus` (or something like it) would be better
* Good job handling the feedback from last time