To debug. 
1) In visual studio code click on the debug icon and create a launch.json file.
2) Install node fetch as we are using fetch use the command
    npm i node-fetch --save
3) Add the line below to the js file to specify the fetch command.
    const fetch = require("node-fetch");
4) To add a variable to watch click on the plus and enter the name of the variable.