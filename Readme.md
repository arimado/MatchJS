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
