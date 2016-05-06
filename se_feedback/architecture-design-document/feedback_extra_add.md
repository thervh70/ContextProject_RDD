|      |            |
|------|------------|
|Group | Rubber Duck Debuggers |
|Assignment|Architecture Design Document|
|Date|04/05/16|
|TA|Bastiaan Reijm|

#Feedback
Extra Feedback on the ADD.

General Notes:

* Section Titles in English are Capitalised Except for Stop Words
* Write the document in the present tense, the document reflects the current state of the architecture
	* Last version you can write in past tense
* Make sure the Glossary term explanations are all aligned properly
	* Use a table otherwise

##Introduc(k)tion
* Leave the (k) in, a dose of humour is allowed
* Wby is *contains* italicized? 
* including a UML­ diagram in order to make the explained concepts and the architecture itself concrete.
	* Restructure this sentence
* so that the (difficult) technical jargon that has been used throughout this document, for explaining technical concepts, can be ...
	* remove (difficult)
	* Assume the reader knows what a Glossary is

###Design goals
* Doesn't need to be very elaborate, be concise
* Availability during the development phase (scrum process) can be removed
	* The 2nd paragraph is enough
* Configurability / Manageability
	* You can cut down the text as well
* Other sections
	* As mentioned above, no need for filler text

##Software Architecture Views
* Better the content does need some more explanation here (as opposed to the previous section)

###Sub-system Decomposition
* For now, good that you use a url (could write the entire doc in markdown and use the image in the url directly)
* DatabaseAdapter
	* Is this a concrete class? If so why not a strategy pattern so future versions can use different databases?
* Tracker 
	* good motivation for the Strategy pattern here
* Controller
	* strictly speaking AI is not right term here (it probably won't pass a Turing test)

###Hardware/Software Mapping
* Also add the technical requirements for the system
	* Which operating systems, ram, connection speed etc
* The sketch is concise but a little text should be added

###Persistent Data Management
* What about Incognito mode?

###Concurrency
* Are callbacks synchronous or asynchronous?


