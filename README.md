# Duke it Out

A messaging platform that allows rival sports fans on differing teams to argue in a fun way. This was created for nwHacks 2019. Built with React, Redux, Node, Express, SocketIO and MySQL. Deployed on Microsoft Azure until the end of April 2019 (http://duke-it-out.azurewebsites.net/).

## Project Details
* User is able to sign up for an account, and login and logout.
* The main page allows users to browse through available chat rooms.
* Once the user is in a chat, they are able to see messages.
* If the user is logged in, they have the option to join a team within their chat.
* Once the user joins a team, their team appears on the left side of the screen and they can send messages to their team
* Conversely, the opposite team appears on the right side of the screen.

## Screen Shots
<img src="https://github.com/Chrom3e/duke-it-out/blob/master/pics/2019-03-21%2020_24_14-Duke%20It%20Out.png" width=425px style="display:inline"> <img src="https://github.com/Chrom3e/duke-it-out/blob/master/pics/2019-03-21%2020_24_57-Duke%20It%20Out.png" width=425px> <img src="https://github.com/Chrom3e/duke-it-out/blob/master/pics/2019-03-21%2020_26_10-Duke%20It%20Out.png" width=425px> <img src="https://github.com/Chrom3e/duke-it-out/blob/master/pics/2019-03-21%2020_30_54-Duke%20It%20Out.png" width=425px>

## Implementation Details
* React front-end (from Create React App) and Redux (for storing user state)
* NodeJS/Express back-end REST API with a MySQL database
* Instant Messaging capabilities with SocketIO websocket functionality
* User authentication with BCrypt and JWT


## Setup/Installation  

Clone this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install` to install server dependencies

`npm run client-install` to install client dependencies

To Start Server:

`npm run server` to run server server

`npm run client` to run client server

To Visit App:

`localhost:3000/`  
