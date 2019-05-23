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

- **/Api** I created a folder for models, each model file will contain all the http methods for a particular collection (i.e technologies/candidats).


