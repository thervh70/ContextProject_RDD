|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Sprint 5|
|Date|29/05/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 5.

Total: **9.55**

| User Story | Score |
|------------|-------|
| definition |  9   |
| splitting  |  10     |
| responsibility | 10  |

| Learning from History | Score |
|-----------------------|-------|
| estimation            | 10    |
| prioritisation        | 10    |
| reflection            | 9   |

## Notes
* Well done
* That Matthias took over Robin's task should be added in a note, it looks like both were assigned responsibility and then one member was removed
* Why is the row Octopeer from Logging Data empty and what is it?
* Blank page 3
* Make sure everyone catches up again on their hours in the next sprints.

#Code Evolution Quality Feedback

Total: **8.98**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |  9    |
| Architecture Design Document (ADD) |  8    |

|                     | Score |
|---------------------|-------|
| Code Change Quality |  8    |

| Code Readability | Score |
|------------------|-------|
| Formatting       |  10    |
| Naming           |   9   |
| Comments         |   9   |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |  10    |
| Testing                |  8    |

|         | Score |
|---------|-------|
| Tooling |   10   |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |  10    |
| Code Review            |  10    |

##Notes
* ADD
	* Good addition of the Sequence diagram of the start up, refer to Feedback of Sprint 4 for other useful diagrams to add.
	* You have certain design goals, missing an overview of what you've done to accomplish these goals
* Options
	* 12 parameters of type boolean
		* `update` with ternary statements is neccesary because that number of if is even worse
		* use a map and enums / consts
			* cuts down on the get calls
			* easier to iterate over and apply changes
			* more extensible
* ContentController
	* `DoNotWatchOptions.getElements().indexOf(elementSelectionBinding) > 0`
		* splitting up the algorithm doesn't reduce the amount of code
		* readability for this project is reasonable
		* better to have self-explanatory code
			* this statement can be converted to a simpler to read function call
			* make it easier to read whenever possible
		* also why 0, not -1 or >= 0
* EventID
	* added consts, nice now less magic numbers
	* `get the value of the element ID.` (line 36)
		* copy paste error from ElementID? (line 82)
* `AbstractElementSelectionBehaviour`
	* elementDsc
		* isn't very descriptive
		* most values seem to be CSS selectors?
			* if a new view of GitHub gets made how easily is this tool updated?
		* Dsc often refers to descending and not description
			* Better to write out description
* Good job on testing, to improve the grade:
	* increase the test coverage
	* motivate my this is the maximum reasonable coverage and add doc to git