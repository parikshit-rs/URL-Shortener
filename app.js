const express = require('express');
const mongoose = require('mongoose');

const app = express();

// To connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// To check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// To create a URL schema
const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
});

// To create a URL model
const Url = mongoose.model('Url', urlSchema);

// To configure EJS as the view engine
app.set('view engine', 'ejs');

// For Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// To serve static files from the "public" directory
app.use(express.static('public'));

// For Home page
app.get('/', (req, res) => {
  res.render('index');
});

// For URL shortening route
app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // To generate a short URL
  const shortUrl = generateShortUrl();

  // To create a new URL entry in the database
  await Url.create({ longUrl, shortUrl });

  res.render('shortened', { shortUrl });
});

// For URL redirection route
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  // To find the long URL based on the short URL
  const url = await Url.findOne({ shortUrl });

  if (url) {
    res.redirect(url.longUrl);
  } else {
    res.sendStatus(404);
  }
});

// For URL search route
app.get('/search/:keyword', (req, res) => {
  const { keyword } = req.params;
  
  // To perform MongoDB Atlas Search
  Url.find({ $text: { $search: keyword } })
    .then((results) => {
      res.render('search', { keyword, results });
    })
    .catch((error) => {
      console.error('Error searching URLs:', error);
      res.render('search', { keyword, results: [] });
    });
});


// To start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Function to generate a random short URL
function generateShortUrl() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortUrl = '';
  for (let i = 0; i < 6; i++) {
    shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortUrl;
}
