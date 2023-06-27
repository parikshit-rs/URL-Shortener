# URL Shortener with search based functionality
The user flow in this project involves entering a long URL through a form on the front-end. The back-end receives the long URL, generates a short URL 
using the shortening algorithm, and stores both the long and short URLs in the database. The short URL is then presented to the user, who can share or 
use it to access the original long URL. Additionally, users can search for previously created URLs by entering keywords. The back-end performs a search 
query using MongoDB Atlas Search, retrieves matching results from the database, and presents them to the user.

Overall, the project provides a complete URL shortening solution with the ability to generate short URLs, store them in a database, and offer search 
functionality to retrieve URLs based on keywords.It also has a search based functionalty which has been implemented using MongoDB Atlas search.

# How to run this project
First, make sure you have Node.js and MongoDB installed on your machine. Then, follow these steps:

## Step 1: Set up the project

Create a new directory for your project and navigate into it.

Run the following command (in Git Bash) to initialize a new Node.js project and install the required dependencies:

	npm init -y
	npm install express ejs mongoose

## Step 2: Create the directory structure

Inside the project directory, create the following directories and files:

views directory: Contains the EJS templates.

public directory: Contains static files such as CSS and client-side JavaScript.

app.js file: The main server-side JavaScript file.

> app.js is provided.

## Step 3: Set up the server

I have already done setup in the app.js file that I have provided.

> In my system the command 'mongodb://localhost:27017' was unable to connect my file to mongodb so I renamed it to 'mongodb://127.0.0.1:27017', 
after which the application works.

## Step 4: Create the EJS templates

Inside the views directory, create the following EJS templates:

- index.ejs: Contains the HTML form for URL input.

- shortened.ejs: Displays the shortened URL.

- search.ejs: Displays the search results.

> index.ejs, shortened.ejs and search.ejs are provided in views folder.

## Step 5: Create the CSS file

Inside the public directory, create a file named styles.css and add CSS styles for the application.

> styles.css is provided in public folder. Although I did not spend much time in writing this, pardon the ugly interface :p

## Step 6: To run the this web application, follow these steps:
1. Make sure that MongoDB is running on your machine.
2. Open a terminal or command prompt and navigate to the project directory.
3. Run the following command to start the server:
   
   node app.js
   
4. The server will start running on http://localhost:3000.
5. Open a web browser and visit http://localhost:3000 to access the URL shortener application.
6. You can enter a long URL in the input field and click the "Shorten" button to generate a short URL. The shortened URL will be displayed on the page.
7. You can also search for URLs containing a specific keyword, the mongoDB Atlas search has been implemented.

# Internal working of the project
Components used and their purpose:

1. Front-End (HTML, CSS, and JavaScript):
   - HTML: Defines the structure of the web pages and the form to input long URLs.
   - CSS: Styles the web pages to provide a visually appealing and user-friendly interface.
   - JavaScript: Handles user interactions, such as form submission, AJAX requests to the server, and displaying the generated shortened URLs.

2. Back-End (Node.js, Express.js, and MongoDB):
   - Node.js: A JavaScript runtime environment that allows running JavaScript code on the server-side.
   - Express.js: A web framework for Node.js that simplifies the creation of web applications and APIs.
   - MongoDB: A NoSQL database used to store and retrieve URL data.

3. Database (MongoDB):
   - Schema: The `Url` model defines the structure of the URL data stored in the database, including the long URL, short URL, and creation timestamp.
   - Operations: The project performs CRUD (Create, Read, Update, Delete) operations on the `Url` collection. It creates new URL entries, retrieves URLs 
     based on search or specific conditions, and deletes URLs when required.

Algorithms and functionalities:

1. URL Shortening Logic:
   - Shortening Algorithm: The project uses a custom algorithm to generate short URLs based on the provided long URLs. The algorithm typically involves 
     generating a unique identifier, encoding it, and appending it to a base URL to create the short URL.
   - Database Storage: The generated short URL, along with the corresponding long URL and creation timestamp, is stored in the MongoDB database using the 
     `Url` model.

2. Search Functionality:
   - MongoDB Atlas Search: The project incorporates MongoDB Atlas Search to enable keyword-based search functionality. It creates an index on the desired 
     fields (e.g., `longUrl`) and uses the `$text` operator and `$search` operator to perform text-based search queries.
