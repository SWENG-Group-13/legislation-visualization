# legislation-visualization

### Overview
The goal of the project is to deliver an easy to use web application that meaningfully displays the many changes legislative documents undergo between their introduction and their final passage into law. The app includes multiple graphs and analytics that show how individual bills move through the legislative process, when the Oireachtas is most productive, and the relationships of legislators, political parties, and indivudal bills.

Features:
- Bills can be displayed based on a given date range or by searching for keywords.
- The timelime graph shows all bills for a given query, it color codes the various stages a bill goes through, and allows the user to zoom and scroll through the timeline.
- The sponsorship graph show legislators in orange, bills in blue, and the relationships of who worked on what.
- The contribuitors graph shows the frequency of actions the Oireachtas has taken on a given day, with darker squares repersenting more actions. 
- The summary section shows which political parties are most involved in the current legislative process, by breaking down the percent of bills they have sponsored.

### Installation
The application can be found on githhub at: https://github.com/SWENG-Group-13/legislation-visualization

It requires the installation of Node.js and NPM.

To run the application, first navigate to the frontend folder from the project root:
### `cd frontend`

Then run the following command to install all dependencies:
### `npm install`

Finally, use the following command to run the application:
### `npm start`

The application will run on at should automatically open in the brower at:
 http://localhost:3000/

 Further instruction can be found in the automatically generated README.md file found in the frontend folder.
