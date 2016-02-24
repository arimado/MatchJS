# Match JS

Match JS is a Matching Pairs card game about JavaScript. 

#### Architecture
----

Data

- Card data will be stored in a 2D array of objects 
- Each object will have: state, content and pair properties 
- 2D Array will be randomly populated 

Render

- Board will be rendered to the DOM
- Each card element will have state/ID attributes

Actions 

- Init stuff
- Compare active state pairs with each other
- End: Win/Lose stuff
