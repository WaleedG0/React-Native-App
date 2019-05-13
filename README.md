### Usage

```sh
yarn start 
```


## Architecture

- **/Components** This folder contains Reusable UI  presentational components some of them are (ICon / Header) etc.

- **/Containers** Here is where things starts to get a little bit interesting, each container folder will contain 4 files:

     - *Component file* :  (P.S the reason why i did not put this file in the components folder because it not reusable and it just acts like a screen/page).

    - *Container file* : 
    No thing new here, This where components connects to redux.
    
    - *Redux file* : Here I am following "ducks-modular-redux" proposal to group all redux stuff in one file. i really do like this approach because it keeps everything in one place which makes things easier when debugging.
    
    - *Styles file* :  I used React Native StyleSheets for styling our components. i also used inline styles in some of components because lack of time.

- **/Api** I know that this application only hits tow endpoints and this might seem like an overkill but i like to keep everything modular so i created a folder for models, each model file will contain all the http methods for a particular collection (i.e technologies/candidates).




### Improvements

This is a list of things that I would improve if i had more time:

- **Ui**: I used Native base as a UI Library to quicklly put together a decent UI but due to lack of time I could not polish it and make it look nicer and more friendly and perhaps fix some of the bugs hahaha. 

- **Performance**: I wan going to use React Native FlatList to render the matched candidates but because I am using absolute positiong to stack the list of candidates to make the tender swipe but it turned out that FlatList does not work with position absolute so I used .map but i did not have the time to configure to lazy render the components instead I limited to only render 50 views maximum.

- **Type-checking**: I usually use flow.js to define the types of data that are passed into the components, but for this simple taks I used PropTypes

- **Testing**: Due to lack of time i was not able to write tests with jest & enzyme. 


