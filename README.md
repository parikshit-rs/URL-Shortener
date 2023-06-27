# URL Shortener with search based functionality
The user flow in this project involves entering a long URL through a form on the front-end. The back-end receives the long URL, generates a short URL 
using the shortening algorithm, and stores both the long and short URLs in the database. The short URL is then presented to the user, who can share or 
use it to access the original long URL. Additionally, users can search for previously created URLs by entering keywords. The back-end performs a search 
query using MongoDB Atlas Search, retrieves matching results from the database, and presents them to the user.

Overall, the project provides a complete URL shortening solution with the ability to generate short URLs, store them in a database, and offer search 
functionality to retrieve URLs based on keywords.It also has a search based functionalty which has been implemented using MongoDB Atlas search.

# How to run this project
First, make sure you have Node.js and MongoDB installed on your machine. Then, follow these steps:

## Set up the project

Create a new directory for your project and navigate into it.

Run the following command (in Git Bash) to initialize a new Node.js project and install the required dependencies:

	npm init -y
	npm install express ejs mongoose

Step 2: Create the directory structure

Inside the project directory, create the following directories and files:

views directory: Contains the EJS templates.
public directory: Contains static files such as CSS and client-side JavaScript.
app.js file: The main server-side JavaScript file.(app.js is provided)

Step 3: Set up the server

I have already done setup in the app.js file that I have provided.

> In my system the command 'mongodb://localhost:27017' was unable to connect my file to mongodb so I renamed it to 'mongodb://127.0.0.1:27017', 
after which the application works.

Step 4: Create the EJS templates

Inside the views directory, create the following EJS templates:

index.ejs: Contains the HTML form for URL input.(index.ejs is provided in views folder)
shortened.ejs: Displays the shortened URL.(shortened.ejs is provided in views folder)
search.ejs: Displays the search results.(search.ejs is provided is provided in views folder)

Step 5: Create the CSS file

Inside the public directory, create a file named styles.css and add CSS styles for the application.
(styles.css is provided in public folder. Although I did not spend much time in writing this, pardon the ugly interface :p)

Step 6: To run the this web application, follow these steps:
1. Make sure that MongoDB is running on your machine.
2. Open a terminal or command prompt and navigate to the project directory.
3. Run the following command to start the server:
   
   node app.js
   
4. The server will start running on http://localhost:3000.
5. Open a web browser and visit http://localhost:3000 to access the URL shortener application.
6. You can enter a long URL in the input field and click the "Shorten" button to generate a short URL. The shortened URL will be displayed on the page.
7. You can also search for URLs containing a specific keyword, the mongoDB Atlas search has been implemented.

