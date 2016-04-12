# Match JS

Match JS is a Matching Pairs card game about JavaScript.

#### Architecture
----

MAtch JS will focus on a declarative approach to programming and sperate the Application with its Engine. Putting priority on readability and maintainability.

Declartive Rules:

- Call a createElement function to write individual DOM nodes to the container - one at a time.
- Do not re-use the array. Make a new array tp draw from each time instead of tweeking small parts.
- Think about 'How you would write this if Performance was not an issue?'

----

Data

- Card data will be stored in a 1D array of objects
- Each object will have: state, content and pair properties
- Array will be randomly populated

Render

- Board will be rendered to the DOM

Actions

- Init stuff
- Compare active state pairs with each other
- End: Win/Lose stuff


## Notes

### Modules

#### References to external modules

Render.js



State.js

- UTIL

Action.js

### Render functions

// RENDER ENGINE GOALS

- do the single event listener thing that goes on the parent
// - create a createDiv function

- i need a function that gives me the active state and previous state and compares the two
// - these two states would be the virtual DOM kind of thing
- all i want to be doing is manipulting stuff on the DATA and for that to be reflected with my render function

// --------

-  I want to find the cardID's that have changed
// and for those cardID's i want you to re-render the there corresponding elements.
-  i think that's what react does?
- then we'll just clean up the code after. Cool.
