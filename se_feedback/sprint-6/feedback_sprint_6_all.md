|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Sprint 6|
|Date|04/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 6.

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
* Several unfinished tasks (like bug fixes) aren't explained
* Task #64
	* Estimated effort is 0 but cost 3 hours? Not very good estimation
* Thanks for fixing the layout problems and for keeping things clear 

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
	* 1.1 Reliability - how does an adapter ensure a reliable connection?
	* 1.1 Securability - have these security options been implemented (username encryption etc)?
		* also the database still works on http, so how secure is this tool?
	* Diagrams make the flow through the extension much clearer, thanks
* Good work on the test coverage report!
* MessageSendDatabaseAdapter
	* (copy-pasting is bad, mmkay), lol - good to keep in mind
	* `postKeystroke` - `postWindowResolution`
		* contain identical code except for the type value, include the type in the event and pass a generic Event
		* makes the switch in the `MainController` smaller as well
* `URLHandler`
	* contains only public static functions but isn't singleton?
* Good job handling the feedback from last time