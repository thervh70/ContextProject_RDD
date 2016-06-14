|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Sprint 6|
|Date|04/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 6.

Total: **9.35**

| User Story | Score |
|------------|-------|
| definition |  10   |
| splitting  |  10     |
| responsibility | 10  |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |   9  |
| prioritisation        |  10   |
| reflection            |  8  |

## Notes
* Several unfinished tasks (like bug fixes) aren't explained
* Task #64
	* Estimated effort is 0 but cost 3 hours? Not very good estimation
* Thanks for fixing the layout problems and for keeping things clear 

#Code Evolution Quality Feedback

Total: **9.37**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |  8    |
| Architecture Design Document (ADD) |  9    |

|                     | Score |
|---------------------|-------|
| Code Change Quality |  8    |

| Code Readability | Score |
|------------------|-------|
| Formatting       |  10    |
| Naming           |  10    |
| Comments         |  10    |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |  10    |
| Testing                |  10    |

|         | Score |
|---------|-------|
| Tooling |  10    |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |   10   |
| Code Review            |   10   |

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