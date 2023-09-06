# RaceWalkLIVE
RaceWalkLIVE is a powerful NodeJS tool to dispay RaceWalk athletes warning in a live streaming. An operator select the number of the athlete and the type of warning (‘loss of contact’ ~ and ‘bent knee’ <) and through WebSocket the server retrive from a database the athlete information and display them on a live page with animations.

## How to install
1. GitClone the repo in the server
2. Enter `node i` to install all the packages
3. Create `.env` file with the string `DB=MONGODB_STRING`
4. Create a collection on MongoDB called `atheltes`
5. Insert all athletes in the DB with the following layout: 
  ```
  {
    "number": "1234",
    "name": "Giulio CASALEGNO",
    "club": "Battaglio CUS Torino",
    "race": "20km CM"
  }
  ```
## Default ports
The default used ports of Express is `2086` and of WebSocket is `8880`
